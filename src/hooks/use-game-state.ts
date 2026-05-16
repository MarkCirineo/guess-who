"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { characters as allCharacters } from "@/lib/characters";
import type {
  Character,
  Player,
  Question,
  GameSettings,
  GameMode,
} from "@/types/game";

export type ScreenState =
  | "connecting"
  | "waiting"
  | "playing"
  | "finished";

export interface GameData {
  // Connection
  screenState: ScreenState;
  roomCode: string | null;
  myId: string | null;
  error: string | null;

  // Players
  players: Player[];
  myPlayer: Player | null;
  opponent: Player | null;

  // Game
  mySecret: Character | null;
  crossedOut: Set<string>;
  currentTurn: string | null;
  isMyTurn: boolean;
  questionHistory: Question[];
  pendingQuestion: Question | null;
  settings: GameSettings;

  // Result
  winner: string | null;
  winnerName: string | null;
  loserName: string | null;
  winnerCharacter: Character | null;
  loserCharacter: Character | null;
  guessedCharacter: Character | null;
  wasCorrect: boolean | null;
  iWon: boolean | null;
  rematchRequested: boolean;
  opponentWantsRematch: boolean;

  // Actions
  createRoom: (name: string) => void;
  joinRoom: (code: string, name: string) => void;
  setReady: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  toggleCard: (characterId: string) => void;
  askQuestion: (question: string) => void;
  answerQuestion: (questionId: string, answer: "yes" | "no") => void;
  makeGuess: (characterId: string) => void;
  requestRematch: () => void;
}

export function useGameState(): GameData {
  const [screenState, setScreenState] = useState<ScreenState>("connecting");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [mySecret, setMySecret] = useState<Character | null>(null);
  const [crossedOut, setCrossedOut] = useState<Set<string>>(new Set());
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);
  const [questionHistory, setQuestionHistory] = useState<Question[]>([]);
  const [pendingQuestion, setPendingQuestion] = useState<Question | null>(null);
  const [settings, setSettings] = useState<GameSettings>({
    mode: "board-only",
    showSuggestions: true,
  });

  // Result state
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [loserName, setLoserName] = useState<string | null>(null);
  const [winnerCharacter, setWinnerCharacter] = useState<Character | null>(null);
  const [loserCharacter, setLoserCharacter] = useState<Character | null>(null);
  const [guessedCharacter, setGuessedCharacter] = useState<Character | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [opponentWantsRematch, setOpponentWantsRematch] = useState(false);

  const socketRef = useRef(getSocket());

  useEffect(() => {
    const socket = socketRef.current;

    // If the socket is already connected (e.g. from a previous page navigation),
    // the 'connect' event won't fire again. Grab the ID immediately.
    if (socket.connected && socket.id) {
      setMyId(socket.id);
    }

    socket.on("connect", () => {
      setMyId(socket.id ?? null);
      if (screenState === "connecting" && !roomCode) {
        // Stay in connecting, waiting for user action
      }
    });

    socket.on("room-created", ({ roomCode: code }) => {
      setRoomCode(code);
      setScreenState("waiting");
      setError(null);
    });

    socket.on("player-joined", ({ players: p }) => {
      setPlayers(p);
    });

    socket.on("room-state", ({ gameState, secretCharacter, crossedOut: co }) => {
      setRoomCode(gameState.roomCode);
      setPlayers(gameState.players);
      setSettings(gameState.settings);
      setCurrentTurn(gameState.currentTurn);
      setQuestionHistory(gameState.questionHistory);
      setPendingQuestion(gameState.pendingQuestion);

      if (secretCharacter) {
        // Find the full character from our local data
        const fullChar = allCharacters.find(c => c.id === secretCharacter.id);
        setMySecret(fullChar || secretCharacter);
      }

      if (co && co.length > 0) {
        setCrossedOut(new Set(co));
      }

      if (gameState.state === "playing") {
        setScreenState("playing");
      } else if (gameState.state === "finished") {
        setScreenState("finished");
      } else {
        setScreenState("waiting");
      }
    });

    socket.on("settings-updated", ({ settings: s }) => {
      setSettings(s);
    });

    socket.on("game-started", ({ secretCharacter, currentTurn: ct, players: p }) => {
      const fullChar = allCharacters.find(c => c.id === secretCharacter.id);
      setMySecret(fullChar || secretCharacter);
      setCurrentTurn(ct);
      setPlayers(p);
      setCrossedOut(new Set());
      setQuestionHistory([]);
      setPendingQuestion(null);
      setScreenState("playing");
      setWinner(null);
      setWinnerName(null);
      setLoserName(null);
      setWinnerCharacter(null);
      setLoserCharacter(null);
      setGuessedCharacter(null);
      setWasCorrect(null);
      setRematchRequested(false);
      setOpponentWantsRematch(false);
    });

    socket.on("question-asked", ({ question }) => {
      setPendingQuestion(question);
    });

    socket.on("question-answered", ({ question, nextTurn }) => {
      setQuestionHistory(prev => [...prev, question]);
      setPendingQuestion(null);
      setCurrentTurn(nextTurn);
    });

    socket.on("game-over", (result) => {
      setScreenState("finished");
      setWinner(result.winner);
      setWinnerName(result.winnerName);
      setLoserName(result.loserName);
      // Resolve against local character data to get full objects with avatar paths
      // (the server only sends {id, name} without avatars)
      const winChar = result.winnerCharacter
        ? allCharacters.find(c => c.id === result.winnerCharacter.id) || result.winnerCharacter
        : null;
      const loseChar = result.loserCharacter
        ? allCharacters.find(c => c.id === result.loserCharacter.id) || result.loserCharacter
        : null;
      const guessChar = result.guessedCharacter
        ? allCharacters.find(c => c.id === result.guessedCharacter.id) || result.guessedCharacter
        : null;
      setWinnerCharacter(winChar);
      setLoserCharacter(loseChar);
      setGuessedCharacter(guessChar);
      setWasCorrect(result.correct);
    });

    socket.on("rematch-requested", () => {
      setOpponentWantsRematch(true);
    });

    socket.on("game-restarted", ({ secretCharacter, currentTurn: ct, players: p, settings: s }) => {
      const fullChar = allCharacters.find(c => c.id === secretCharacter.id);
      setMySecret(fullChar || secretCharacter);
      setCurrentTurn(ct);
      setPlayers(p);
      setSettings(s);
      setCrossedOut(new Set());
      setQuestionHistory([]);
      setPendingQuestion(null);
      setScreenState("playing");
      setWinner(null);
      setWinnerName(null);
      setLoserName(null);
      setWinnerCharacter(null);
      setLoserCharacter(null);
      setGuessedCharacter(null);
      setWasCorrect(null);
      setRematchRequested(false);
      setOpponentWantsRematch(false);
    });

    socket.on("player-disconnected", ({ playerId }) => {
      setPlayers(prev =>
        prev.map(p => (p.id === playerId ? { ...p, connected: false } : p))
      );
    });

    socket.on("player-reconnected", ({ playerId }) => {
      setPlayers(prev =>
        prev.map(p => (p.id === playerId ? { ...p, connected: true } : p))
      );
    });

    socket.on("error", ({ message }) => {
      setError(message);
      setTimeout(() => setError(null), 5000);
    });

    return () => {
      // Remove only OUR listeners — never use removeAllListeners() as it
      // destroys socket.io's internal handlers and breaks the connection
      // (especially during React Strict Mode's mount→cleanup→remount cycle).
      socket.off("connect");
      socket.off("room-created");
      socket.off("player-joined");
      socket.off("room-state");
      socket.off("settings-updated");
      socket.off("game-started");
      socket.off("question-asked");
      socket.off("question-answered");
      socket.off("game-over");
      socket.off("rematch-requested");
      socket.off("game-restarted");
      socket.off("player-disconnected");
      socket.off("player-reconnected");
      socket.off("error");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Derived state
  const myPlayer = players.find(p => p.id === myId) || null;
  const opponent = players.find(p => p.id !== myId) || null;
  const isMyTurn = currentTurn === myId;
  const iWon = winner !== null ? winner === myId : null;

  // Actions
  const createRoom = useCallback((name: string) => {
    socketRef.current.emit("create-room", { playerName: name });
  }, []);

  const joinRoom = useCallback((code: string, name: string) => {
    socketRef.current.emit("join-room", { roomCode: code, playerName: name });
  }, []);

  const setReady = useCallback(() => {
    if (roomCode) {
      socketRef.current.emit("player-ready", { roomCode });
    }
  }, [roomCode]);

  const updateSettings = useCallback((partial: Partial<GameSettings>) => {
    if (roomCode) {
      const newSettings = { ...settings, ...partial };
      socketRef.current.emit("update-settings", { roomCode, settings: newSettings });
    }
  }, [roomCode, settings]);

  const toggleCard = useCallback((characterId: string) => {
    setCrossedOut(prev => {
      const next = new Set(prev);
      if (next.has(characterId)) {
        next.delete(characterId);
      } else {
        next.add(characterId);
      }
      return next;
    });
    if (roomCode) {
      socketRef.current.emit("toggle-card", { roomCode, characterId });
    }
  }, [roomCode]);

  const askQuestion = useCallback((question: string) => {
    if (roomCode) {
      socketRef.current.emit("ask-question", { roomCode, question });
    }
  }, [roomCode]);

  const answerQuestion = useCallback((questionId: string, answer: "yes" | "no") => {
    if (roomCode) {
      socketRef.current.emit("answer-question", { roomCode, questionId, answer });
    }
  }, [roomCode]);

  const makeGuess = useCallback((characterId: string) => {
    if (roomCode) {
      socketRef.current.emit("final-guess", { roomCode, characterId });
    }
  }, [roomCode]);

  const requestRematch = useCallback(() => {
    if (roomCode) {
      setRematchRequested(true);
      socketRef.current.emit("rematch", { roomCode });
    }
  }, [roomCode]);

  return {
    screenState,
    roomCode,
    myId,
    error,
    players,
    myPlayer,
    opponent,
    mySecret,
    crossedOut,
    currentTurn,
    isMyTurn,
    questionHistory,
    pendingQuestion,
    settings,
    winner,
    winnerName,
    loserName,
    winnerCharacter,
    loserCharacter,
    guessedCharacter,
    wasCorrect,
    iWon,
    rematchRequested,
    opponentWantsRematch,
    createRoom,
    joinRoom,
    setReady,
    updateSettings,
    toggleCard,
    askQuestion,
    answerQuestion,
    makeGuess,
    requestRematch,
  };
}
