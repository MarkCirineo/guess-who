import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import Redis from "ioredis";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// ============================================
// Redis Setup
// ============================================

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  retryStrategy: (times) => Math.min(times * 200, 5000),
});

redis.on("connect", () => console.log("[redis] Connected"));
redis.on("error", (err) => console.error("[redis] Error:", err.message));

// ============================================
// Character data (duplicated from src/lib/characters.ts for server usage)
// We keep a minimal version here to avoid TypeScript/ESM import issues
// ============================================

const characters = [
  { id: 'alex', name: 'Alex' }, { id: 'bella', name: 'Bella' },
  { id: 'carlos', name: 'Carlos' }, { id: 'diana', name: 'Diana' },
  { id: 'ethan', name: 'Ethan' }, { id: 'fiona', name: 'Fiona' },
  { id: 'george', name: 'George' }, { id: 'hannah', name: 'Hannah' },
  { id: 'ivan', name: 'Ivan' }, { id: 'jade', name: 'Jade' },
  { id: 'kevin', name: 'Kevin' }, { id: 'luna', name: 'Luna' },
  { id: 'marco', name: 'Marco' }, { id: 'nina', name: 'Nina' },
  { id: 'oscar', name: 'Oscar' }, { id: 'penny', name: 'Penny' },
  { id: 'quinn', name: 'Quinn' }, { id: 'rosa', name: 'Rosa' },
  { id: 'sam', name: 'Sam' }, { id: 'tara', name: 'Tara' },
  { id: 'umar', name: 'Umar' }, { id: 'violet', name: 'Violet' },
  { id: 'will', name: 'Will' }, { id: 'xena', name: 'Xena' },
];

// ============================================
// Player Identity Mapping
// ============================================
// playerId = stable UUID from client localStorage
// socketId = transient socket.io connection ID

/** @type {Map<string, string>} playerId → socketId */
const playerToSocket = new Map();
/** @type {Map<string, string>} socketId → playerId */
const socketToPlayer = new Map();

function emitToPlayer(io, playerId, event, data) {
  const socketId = playerToSocket.get(playerId);
  if (socketId) io.to(socketId).emit(event, data);
}

// ============================================
// Room Management
// ============================================

/** @type {Map<string, GameRoom>} */
const rooms = new Map();

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/0/1 to avoid confusion
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function createRoom(playerId, playerName) {
  let code;
  do {
    code = generateRoomCode();
  } while (rooms.has(code));

  const room = {
    code,
    players: new Map(),
    state: 'waiting', // 'waiting' | 'playing' | 'finished'
    settings: {
      mode: 'board-only',
      showSuggestions: true,
    },
    currentTurn: null,
    secretCharacters: new Map(), // playerId -> character object
    crossedOut: new Map(), // playerId -> Set<characterId>
    questionHistory: [],
    pendingQuestion: null,
    rematchRequests: new Set(),
  };

  room.players.set(playerId, {
    id: playerId,
    name: playerName,
    ready: false,
    connected: true,
  });

  rooms.set(code, room);
  return room;
}

function getPublicPlayers(room) {
  return Array.from(room.players.values()).map(p => ({
    id: p.id,
    name: p.name,
    ready: p.ready,
    connected: p.connected,
  }));
}

function getPublicGameState(room) {
  return {
    roomCode: room.code,
    players: getPublicPlayers(room),
    state: room.state,
    settings: room.settings,
    currentTurn: room.currentTurn,
    questionHistory: room.questionHistory,
    pendingQuestion: room.pendingQuestion,
    winner: room.winner || null,
    loser: room.loser || null,
    gameResult: room.gameResult || null,
  };
}

function startGame(room) {
  // Shuffle characters and assign one to each player
  const shuffled = [...characters].sort(() => Math.random() - 0.5);
  const playerIds = Array.from(room.players.keys());

  playerIds.forEach((pid, i) => {
    room.secretCharacters.set(pid, shuffled[i]);
    room.crossedOut.set(pid, new Set());
    const player = room.players.get(pid);
    if (player) player.ready = false;
  });

  room.state = 'playing';
  room.questionHistory = [];
  room.pendingQuestion = null;
  room.winner = null;
  room.loser = null;
  room.gameResult = null;
  room.rematchRequests = new Set();

  // In 'with-questions' mode, randomly pick first turn
  if (room.settings.mode === 'with-questions') {
    room.currentTurn = playerIds[Math.floor(Math.random() * playerIds.length)];
  } else {
    room.currentTurn = null;
  }
}

// ============================================
// Redis Serialization
// ============================================

const ROOM_TTL = 7200; // 2 hours

function serializeRoom(room) {
  return {
    code: room.code,
    state: room.state,
    settings: room.settings,
    currentTurn: room.currentTurn,
    questionHistory: room.questionHistory,
    pendingQuestion: room.pendingQuestion,
    winner: room.winner || null,
    loser: room.loser || null,
    gameResult: room.gameResult || null,
    players: Object.fromEntries(room.players),
    secretCharacters: Object.fromEntries(room.secretCharacters),
    crossedOut: Object.fromEntries(
      Array.from(room.crossedOut.entries()).map(([k, v]) => [k, [...v]])
    ),
    rematchRequests: [...room.rematchRequests],
  };
}

function deserializeRoom(data) {
  return {
    ...data,
    players: new Map(Object.entries(data.players)),
    secretCharacters: new Map(Object.entries(data.secretCharacters)),
    crossedOut: new Map(
      Object.entries(data.crossedOut).map(([k, v]) => [k, new Set(v)])
    ),
    rematchRequests: new Set(data.rematchRequests),
  };
}

async function saveRoom(room) {
  try {
    const data = JSON.stringify(serializeRoom(room));
    await redis.set(`room:${room.code}`, data, "EX", ROOM_TTL);
  } catch (err) {
    console.error(`[redis] Failed to save room ${room.code}:`, err.message);
  }
}

async function deleteRoomFromRedis(code) {
  try {
    await redis.del(`room:${code}`);
  } catch (err) {
    console.error(`[redis] Failed to delete room ${code}:`, err.message);
  }
}

async function loadRoomsFromRedis() {
  try {
    const keys = await redis.keys("room:*");
    console.log(`[redis] Found ${keys.length} room(s) to restore`);
    for (const key of keys) {
      const data = await redis.get(key);
      if (!data) continue;
      const room = deserializeRoom(JSON.parse(data));
      // Mark all players as disconnected — they'll reconnect
      for (const [, player] of room.players) {
        player.connected = false;
      }
      rooms.set(room.code, room);
      console.log(`[redis] Restored room ${room.code} (state: ${room.state})`);
    }
  } catch (err) {
    console.error("[redis] Failed to load rooms:", err.message);
  }
}

// ============================================
// Stale Room Cleanup
// ============================================

// Clean up stale rooms periodically (rooms with no connected players for 30+ min)
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    const anyConnected = Array.from(room.players.values()).some(p => p.connected);
    if (!anyConnected) {
      if (!room._disconnectTime) {
        room._disconnectTime = now;
      } else if (now - room._disconnectTime > 30 * 60 * 1000) {
        rooms.delete(code);
        deleteRoomFromRedis(code);
        console.log(`[cleanup] Removed stale room ${code}`);
      }
    } else {
      room._disconnectTime = null;
    }
  }
}, 60 * 1000);

// ============================================
// Start Server
// ============================================

app.prepare().then(async () => {
  await loadRoomsFromRedis();

  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`[socket] Connected: ${socket.id}`);
    let currentRoom = null;

    // ---- CREATE ROOM ----
    socket.on("create-room", ({ playerName, playerId }) => {
      if (currentRoom) {
        socket.emit("error", { message: "Already in a room" });
        return;
      }

      // Register identity mapping
      socketToPlayer.set(socket.id, playerId);
      playerToSocket.set(playerId, socket.id);

      const room = createRoom(playerId, playerName || "Player 1");
      currentRoom = room.code;
      socket.join(room.code);

      socket.emit("room-created", { roomCode: room.code });
      io.to(room.code).emit("player-joined", { players: getPublicPlayers(room) });

      saveRoom(room);
      console.log(`[room] ${playerName} created room ${room.code}`);
    });

    // ---- JOIN ROOM ----
    socket.on("join-room", ({ roomCode, playerName, playerId }) => {
      const code = roomCode.toUpperCase().trim();
      const room = rooms.get(code);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Register identity mapping
      socketToPlayer.set(socket.id, playerId);
      playerToSocket.set(playerId, socket.id);

      if (room.players.size >= 2 && !room.players.has(playerId)) {
        // Check if a disconnected player can be replaced
        const disconnectedEntry = Array.from(room.players.entries())
          .find(([, p]) => !p.connected);

        if (!disconnectedEntry) {
          socket.emit("error", { message: "Room is full" });
          return;
        }

        // Take over the disconnected player's slot
        const [oldPid, oldPlayer] = disconnectedEntry;

        // Transfer player data to new playerId
        const newPlayer = {
          id: playerId,
          name: playerName || oldPlayer.name,
          ready: oldPlayer.ready,
          connected: true,
        };

        // Remove old entry, add new one
        room.players.delete(oldPid);
        room.players.set(playerId, newPlayer);

        // Transfer game state references
        if (room.secretCharacters.has(oldPid)) {
          room.secretCharacters.set(playerId, room.secretCharacters.get(oldPid));
          room.secretCharacters.delete(oldPid);
        }
        if (room.crossedOut.has(oldPid)) {
          room.crossedOut.set(playerId, room.crossedOut.get(oldPid));
          room.crossedOut.delete(oldPid);
        }
        if (room.currentTurn === oldPid) {
          room.currentTurn = playerId;
        }
        if (room.winner === oldPid) room.winner = playerId;
        if (room.loser === oldPid) room.loser = playerId;
        if (room.rematchRequests.has(oldPid)) {
          room.rematchRequests.delete(oldPid);
          room.rematchRequests.add(playerId);
        }

        // Clean up old player's socket mapping
        playerToSocket.delete(oldPid);

        console.log(`[room] ${playerName} took over disconnected slot in room ${code}`);
      }

      if (currentRoom && currentRoom !== code) {
        socket.emit("error", { message: "Already in a different room" });
        return;
      }

      if (!room.players.has(playerId)) {
        room.players.set(playerId, {
          id: playerId,
          name: playerName || "Player 2",
          ready: false,
          connected: true,
        });
      } else {
        // Reconnecting — same playerId rejoining
        const player = room.players.get(playerId);
        player.connected = true;
        // Cancel any pending disconnect grace timer
        if (room._disconnectTimers && room._disconnectTimers[playerId]) {
          clearTimeout(room._disconnectTimers[playerId]);
          delete room._disconnectTimers[playerId];
        }
      }

      currentRoom = code;
      socket.join(code);

      // Send current state to the joining player
      socket.emit("room-state", {
        gameState: getPublicGameState(room),
        secretCharacter: room.secretCharacters.get(playerId) || null,
        crossedOut: room.crossedOut.has(playerId)
          ? Array.from(room.crossedOut.get(playerId))
          : [],
      });

      io.to(code).emit("player-joined", { players: getPublicPlayers(room) });
      saveRoom(room);
      console.log(`[room] ${playerName} joined room ${code}`);
    });

    // ---- REJOIN ROOM (after server restart) ----
    socket.on("rejoin-room", ({ playerId, roomCode }) => {
      const code = roomCode.toUpperCase().trim();
      const room = rooms.get(code);

      if (!room || !room.players.has(playerId)) {
        socket.emit("error", { message: "Room not found or session expired" });
        return;
      }

      // Clean up any stale socket mapping for this player
      // (e.g. if the old socket hasn't disconnected yet)
      const oldSocketId = playerToSocket.get(playerId);
      if (oldSocketId && oldSocketId !== socket.id) {
        socketToPlayer.delete(oldSocketId);
      }

      // Bind identity
      socketToPlayer.set(socket.id, playerId);
      playerToSocket.set(playerId, socket.id);

      // Mark connected
      const player = room.players.get(playerId);
      player.connected = true;
      // Cancel any pending disconnect grace timer
      if (room._disconnectTimers && room._disconnectTimers[playerId]) {
        clearTimeout(room._disconnectTimers[playerId]);
        delete room._disconnectTimers[playerId];
      }

      currentRoom = code;
      socket.join(code);

      // Send full state back to the rejoining player
      socket.emit("room-state", {
        gameState: getPublicGameState(room),
        secretCharacter: room.secretCharacters.get(playerId) || null,
        crossedOut: room.crossedOut.has(playerId)
          ? Array.from(room.crossedOut.get(playerId))
          : [],
      });

      // Notify the other player
      io.to(code).emit("player-reconnected", {
        playerId: playerId,
        playerName: player.name,
      });

      saveRoom(room);
      console.log(`[room] ${player.name} rejoined room ${code}`);
    });

    // ---- PLAYER READY ----
    socket.on("player-ready", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      const playerId = socketToPlayer.get(socket.id);
      if (!room || !playerId || !room.players.has(playerId)) return;
      if (room.state !== 'waiting') return; // Only allow ready-up before game starts

      const player = room.players.get(playerId);
      player.ready = true;

      io.to(roomCode).emit("player-joined", { players: getPublicPlayers(room) });

      // Check if all players are ready (need exactly 2)
      if (room.players.size === 2) {
        const allReady = Array.from(room.players.values()).every(p => p.ready);
        if (allReady) {
          startGame(room);

          // Send each player their secret character
          for (const [pid] of room.players) {
            const secret = room.secretCharacters.get(pid);
            emitToPlayer(io, pid, "game-started", {
              secretCharacter: secret,
              currentTurn: room.currentTurn,
              players: getPublicPlayers(room),
            });
          }

          console.log(`[game] Game started in room ${roomCode}`);
        }
      }

      saveRoom(room);
    });

    // ---- UPDATE SETTINGS ----
    socket.on("update-settings", ({ roomCode, settings }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'waiting') return;

      // Only the host (first player) can update settings
      const playerId = socketToPlayer.get(socket.id);
      const firstPlayer = Array.from(room.players.keys())[0];
      if (playerId !== firstPlayer) return;

      room.settings = { ...room.settings, ...settings };
      io.to(roomCode).emit("settings-updated", { settings: room.settings });
      saveRoom(room);
    });

    // ---- ASK QUESTION ----
    socket.on("ask-question", ({ roomCode, question }) => {
      const room = rooms.get(roomCode);
      const playerId = socketToPlayer.get(socket.id);
      if (!room || room.state !== 'playing') return;
      if (room.settings.mode !== 'with-questions') return;
      if (room.currentTurn !== playerId) return;
      if (room.pendingQuestion) return;

      const player = room.players.get(playerId);
      const q = {
        id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        from: playerId,
        fromName: player.name,
        text: question,
        answer: null,
        timestamp: Date.now(),
      };

      room.pendingQuestion = q;
      io.to(roomCode).emit("question-asked", { question: q });
      saveRoom(room);
    });

    // ---- ANSWER QUESTION ----
    socket.on("answer-question", ({ roomCode, questionId, answer }) => {
      const room = rooms.get(roomCode);
      const playerId = socketToPlayer.get(socket.id);
      if (!room || room.state !== 'playing') return;
      if (!room.pendingQuestion || room.pendingQuestion.id !== questionId) return;
      if (room.currentTurn === playerId) return; // Can't answer your own question

      room.pendingQuestion.answer = answer;
      room.questionHistory.push({ ...room.pendingQuestion });

      // Switch turn
      const playerIds = Array.from(room.players.keys());
      const nextTurn = playerIds.find(id => id !== room.currentTurn);
      room.currentTurn = nextTurn;
      room.pendingQuestion = null;

      io.to(roomCode).emit("question-answered", {
        question: room.questionHistory[room.questionHistory.length - 1],
        nextTurn,
      });
      saveRoom(room);
    });

    // ---- TOGGLE CARD ----
    socket.on("toggle-card", ({ roomCode, characterId }) => {
      const room = rooms.get(roomCode);
      const playerId = socketToPlayer.get(socket.id);
      if (!room || room.state !== 'playing') return;
      if (!playerId || !room.crossedOut.has(playerId)) return;

      const set = room.crossedOut.get(playerId);
      if (set.has(characterId)) {
        set.delete(characterId);
      } else {
        set.add(characterId);
      }
      // No broadcast — crossed out state is private. Client manages its own UI.
      saveRoom(room);
    });

    // ---- FINAL GUESS ----
    socket.on("final-guess", ({ roomCode, characterId }) => {
      const room = rooms.get(roomCode);
      const playerId = socketToPlayer.get(socket.id);
      if (!room || room.state !== 'playing') return;

      // In with-questions mode, must be your turn
      if (room.settings.mode === 'with-questions' && room.currentTurn !== playerId) return;

      const playerIds = Array.from(room.players.keys());
      const opponentId = playerIds.find(id => id !== playerId);
      const opponentSecret = room.secretCharacters.get(opponentId);
      const mySecret = room.secretCharacters.get(playerId);
      const guessedChar = characters.find(c => c.id === characterId);

      const correct = opponentSecret && opponentSecret.id === characterId;

      room.state = 'finished';

      const guesserPlayer = room.players.get(playerId);
      const opponentPlayer = room.players.get(opponentId);

      const result = {
        winner: correct ? playerId : opponentId,
        winnerName: correct ? guesserPlayer.name : opponentPlayer.name,
        loser: correct ? opponentId : playerId,
        loserName: correct ? opponentPlayer.name : guesserPlayer.name,
        winnerCharacter: correct ? mySecret : opponentSecret,
        loserCharacter: correct ? opponentSecret : mySecret,
        guessedCharacter: guessedChar,
        correct,
      };

      room.winner = result.winner;
      room.loser = result.loser;
      room.gameResult = result;

      io.to(roomCode).emit("game-over", result);
      saveRoom(room);
      console.log(`[game] Game over in room ${roomCode}: ${result.winnerName} wins`);
    });

    // ---- REMATCH ----
    socket.on("rematch", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      const playerId = socketToPlayer.get(socket.id);
      if (!room || room.state !== 'finished') return;

      room.rematchRequests.add(playerId);

      // Notify the other player
      const playerIds = Array.from(room.players.keys());
      const otherId = playerIds.find(id => id !== playerId);
      const player = room.players.get(playerId);

      if (otherId) {
        emitToPlayer(io, otherId, "rematch-requested", {
          from: playerId,
          fromName: player.name,
        });
      }

      // If both requested, restart
      if (room.rematchRequests.size >= 2) {
        // Reset ready state
        for (const [, p] of room.players) {
          p.ready = false;
        }

        startGame(room);

        for (const [pid] of room.players) {
          const secret = room.secretCharacters.get(pid);
          emitToPlayer(io, pid, "game-restarted", {
            secretCharacter: secret,
            currentTurn: room.currentTurn,
            players: getPublicPlayers(room),
            settings: room.settings,
          });
        }

        console.log(`[game] Rematch started in room ${roomCode}`);
      }

      saveRoom(room);
    });

    // ---- DISCONNECT ----
    socket.on("disconnect", () => {
      console.log(`[socket] Disconnected: ${socket.id}`);
      const playerId = socketToPlayer.get(socket.id);

      // Clean up socket-level mappings, but ONLY if this socket is still
      // the active one for this player. If the player already reconnected
      // on a newer socket (race: rejoin processed before old disconnect),
      // don't wipe the new mapping.
      if (playerId) {
        socketToPlayer.delete(socket.id);
        if (playerToSocket.get(playerId) === socket.id) {
          playerToSocket.delete(playerId);
        }
      }

      if (currentRoom && playerId) {
        const room = rooms.get(currentRoom);
        if (room && room.players.has(playerId)) {
          // Only mark disconnected if the player hasn't already reconnected
          // on a different socket
          const currentSocketForPlayer = playerToSocket.get(playerId);
          if (!currentSocketForPlayer) {
            const player = room.players.get(playerId);
            player.connected = false;

            io.to(currentRoom).emit("player-disconnected", {
              playerId: playerId,
              playerName: player.name,
            });

            // In waiting rooms, give the player a grace period to reconnect
            // (handles transient disconnects like HMR page refresh, server restart).
            // If they don't come back, THEN remove them.
            if (room.state === 'waiting') {
              const roomCode = currentRoom;
              if (!room._disconnectTimers) room._disconnectTimers = {};
              room._disconnectTimers[playerId] = setTimeout(() => {
                // Re-check: player may have reconnected during the grace period
                if (room.players.has(playerId) && !room.players.get(playerId).connected) {
                  room.players.delete(playerId);
                  io.to(roomCode).emit("player-joined", { players: getPublicPlayers(room) });
                  console.log(`[room] Removed ${player.name} from waiting room ${roomCode} after grace period`);

                  if (room.players.size === 0) {
                    rooms.delete(roomCode);
                    deleteRoomFromRedis(roomCode);
                    console.log(`[room] Removed empty room ${roomCode}`);
                    return;
                  }
                  saveRoom(room);
                }
              }, 20_000); // 20 second grace period
            }

            saveRoom(room);
          } else {
            console.log(`[socket] Stale disconnect for ${playerId}, already on socket ${currentSocketForPlayer}`);
          }
        }
      }
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Guess Who Online ready on http://${hostname}:${port}`);
    console.log(`> Environment: ${dev ? "development" : "production"}`);
  });
});
