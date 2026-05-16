import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

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

function createRoom(hostSocketId, hostName) {
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
    secretCharacters: new Map(), // socketId -> character object
    crossedOut: new Map(), // socketId -> Set<characterId>
    questionHistory: [],
    pendingQuestion: null,
    rematchRequests: new Set(),
  };

  room.players.set(hostSocketId, {
    id: hostSocketId,
    name: hostName,
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
  room.rematchRequests = new Set();

  // In 'with-questions' mode, randomly pick first turn
  if (room.settings.mode === 'with-questions') {
    room.currentTurn = playerIds[Math.floor(Math.random() * playerIds.length)];
  } else {
    room.currentTurn = null;
  }
}

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

app.prepare().then(() => {
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
    socket.on("create-room", ({ playerName }) => {
      if (currentRoom) {
        socket.emit("error", { message: "Already in a room" });
        return;
      }

      const room = createRoom(socket.id, playerName || "Player 1");
      currentRoom = room.code;
      socket.join(room.code);

      socket.emit("room-created", { roomCode: room.code });
      io.to(room.code).emit("player-joined", { players: getPublicPlayers(room) });

      console.log(`[room] ${playerName} created room ${room.code}`);
    });

    // ---- JOIN ROOM ----
    socket.on("join-room", ({ roomCode, playerName }) => {
      const code = roomCode.toUpperCase().trim();
      const room = rooms.get(code);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (room.players.size >= 2 && !room.players.has(socket.id)) {
        // Check if a disconnected player can be replaced (tab-close reconnection)
        const disconnectedEntry = Array.from(room.players.entries())
          .find(([, p]) => !p.connected);

        if (!disconnectedEntry) {
          socket.emit("error", { message: "Room is full" });
          return;
        }

        // Take over the disconnected player's slot
        const [oldId, oldPlayer] = disconnectedEntry;

        // Transfer player data to new socket ID
        const newPlayer = {
          id: socket.id,
          name: playerName || oldPlayer.name,
          ready: oldPlayer.ready,
          connected: true,
        };

        // Remove old entry, add new one
        room.players.delete(oldId);
        room.players.set(socket.id, newPlayer);

        // Transfer game state references
        if (room.secretCharacters.has(oldId)) {
          room.secretCharacters.set(socket.id, room.secretCharacters.get(oldId));
          room.secretCharacters.delete(oldId);
        }
        if (room.crossedOut.has(oldId)) {
          room.crossedOut.set(socket.id, room.crossedOut.get(oldId));
          room.crossedOut.delete(oldId);
        }
        if (room.currentTurn === oldId) {
          room.currentTurn = socket.id;
        }
        if (room.winner === oldId) room.winner = socket.id;
        if (room.loser === oldId) room.loser = socket.id;
        if (room.rematchRequests.has(oldId)) {
          room.rematchRequests.delete(oldId);
          room.rematchRequests.add(socket.id);
        }

        console.log(`[room] ${playerName} reconnected to room ${code} (took over disconnected slot)`);
      }

      if (currentRoom && currentRoom !== code) {
        socket.emit("error", { message: "Already in a different room" });
        return;
      }

      if (!room.players.has(socket.id)) {
        room.players.set(socket.id, {
          id: socket.id,
          name: playerName || "Player 2",
          ready: false,
          connected: true,
        });
      } else {
        // Reconnecting
        const player = room.players.get(socket.id);
        player.connected = true;
      }

      currentRoom = code;
      socket.join(code);

      // Send current state to the joining player
      socket.emit("room-state", {
        gameState: getPublicGameState(room),
        secretCharacter: room.secretCharacters.get(socket.id) || null,
        crossedOut: room.crossedOut.has(socket.id)
          ? Array.from(room.crossedOut.get(socket.id))
          : [],
      });

      io.to(code).emit("player-joined", { players: getPublicPlayers(room) });
      console.log(`[room] ${playerName} joined room ${code}`);
    });

    // ---- PLAYER READY ----
    socket.on("player-ready", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || !room.players.has(socket.id)) return;

      const player = room.players.get(socket.id);
      player.ready = true;

      io.to(roomCode).emit("player-joined", { players: getPublicPlayers(room) });

      // Check if all players are ready (need exactly 2)
      if (room.players.size === 2) {
        const allReady = Array.from(room.players.values()).every(p => p.ready);
        if (allReady) {
          startGame(room);

          // Send each player their secret character
          for (const [pid, player] of room.players) {
            const secret = room.secretCharacters.get(pid);
            io.to(pid).emit("game-started", {
              secretCharacter: secret,
              currentTurn: room.currentTurn,
              players: getPublicPlayers(room),
            });
          }

          console.log(`[game] Game started in room ${roomCode}`);
        }
      }
    });

    // ---- UPDATE SETTINGS ----
    socket.on("update-settings", ({ roomCode, settings }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'waiting') return;

      // Only the host (first player) can update settings
      const firstPlayer = Array.from(room.players.keys())[0];
      if (socket.id !== firstPlayer) return;

      room.settings = { ...room.settings, ...settings };
      io.to(roomCode).emit("settings-updated", { settings: room.settings });
    });

    // ---- ASK QUESTION ----
    socket.on("ask-question", ({ roomCode, question }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'playing') return;
      if (room.settings.mode !== 'with-questions') return;
      if (room.currentTurn !== socket.id) return;
      if (room.pendingQuestion) return;

      const player = room.players.get(socket.id);
      const q = {
        id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        from: socket.id,
        fromName: player.name,
        text: question,
        answer: null,
        timestamp: Date.now(),
      };

      room.pendingQuestion = q;
      io.to(roomCode).emit("question-asked", { question: q });
    });

    // ---- ANSWER QUESTION ----
    socket.on("answer-question", ({ roomCode, questionId, answer }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'playing') return;
      if (!room.pendingQuestion || room.pendingQuestion.id !== questionId) return;
      if (room.currentTurn === socket.id) return; // Can't answer your own question

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
    });

    // ---- TOGGLE CARD ----
    socket.on("toggle-card", ({ roomCode, characterId }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'playing') return;
      if (!room.crossedOut.has(socket.id)) return;

      const set = room.crossedOut.get(socket.id);
      if (set.has(characterId)) {
        set.delete(characterId);
      } else {
        set.add(characterId);
      }
      // No broadcast — crossed out state is private. Client manages its own UI.
    });

    // ---- FINAL GUESS ----
    socket.on("final-guess", ({ roomCode, characterId }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'playing') return;

      // In with-questions mode, must be your turn
      if (room.settings.mode === 'with-questions' && room.currentTurn !== socket.id) return;

      const playerIds = Array.from(room.players.keys());
      const opponentId = playerIds.find(id => id !== socket.id);
      const opponentSecret = room.secretCharacters.get(opponentId);
      const mySecret = room.secretCharacters.get(socket.id);
      const guessedChar = characters.find(c => c.id === characterId);

      const correct = opponentSecret && opponentSecret.id === characterId;

      room.state = 'finished';

      const guesserPlayer = room.players.get(socket.id);
      const opponentPlayer = room.players.get(opponentId);

      const result = {
        winner: correct ? socket.id : opponentId,
        winnerName: correct ? guesserPlayer.name : opponentPlayer.name,
        loser: correct ? opponentId : socket.id,
        loserName: correct ? opponentPlayer.name : guesserPlayer.name,
        winnerCharacter: correct ? mySecret : opponentSecret,
        loserCharacter: correct ? opponentSecret : mySecret,
        guessedCharacter: guessedChar,
        correct,
      };

      room.winner = result.winner;
      room.loser = result.loser;

      io.to(roomCode).emit("game-over", result);
      console.log(`[game] Game over in room ${roomCode}: ${result.winnerName} wins`);
    });

    // ---- REMATCH ----
    socket.on("rematch", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== 'finished') return;

      room.rematchRequests.add(socket.id);

      // Notify the other player
      const playerIds = Array.from(room.players.keys());
      const otherId = playerIds.find(id => id !== socket.id);
      const player = room.players.get(socket.id);

      if (otherId) {
        io.to(otherId).emit("rematch-requested", {
          from: socket.id,
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
          io.to(pid).emit("game-restarted", {
            secretCharacter: secret,
            currentTurn: room.currentTurn,
            players: getPublicPlayers(room),
            settings: room.settings,
          });
        }

        console.log(`[game] Rematch started in room ${roomCode}`);
      }
    });

    // ---- DISCONNECT ----
    socket.on("disconnect", () => {
      console.log(`[socket] Disconnected: ${socket.id}`);

      if (currentRoom) {
        const room = rooms.get(currentRoom);
        if (room && room.players.has(socket.id)) {
          const player = room.players.get(socket.id);
          player.connected = false;

          io.to(currentRoom).emit("player-disconnected", {
            playerId: socket.id,
            playerName: player.name,
          });

          // If game hasn't started and player disconnects, remove them
          if (room.state === 'waiting') {
            room.players.delete(socket.id);
            io.to(currentRoom).emit("player-joined", { players: getPublicPlayers(room) });

            if (room.players.size === 0) {
              rooms.delete(currentRoom);
              console.log(`[room] Removed empty room ${currentRoom}`);
            }
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
