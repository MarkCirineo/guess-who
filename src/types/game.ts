// ============================================
// Guess Who Online — Shared Types
// ============================================

export type Accessory = 'earrings' | 'necklace' | 'bowtie' | 'scarf' | 'headband';

export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'white';
export type HairLength = 'short' | 'medium' | 'long' | 'bald';
export type EyeColor = 'brown' | 'blue' | 'green';
export type GenderPresentation = 'masculine' | 'feminine';

export interface CharacterAttributes {
  glasses: boolean;
  facialHair: boolean;
  hairColor: HairColor;
  hat: boolean;
  genderPresentation: GenderPresentation;
  smile: boolean;
  accessories: Accessory[];
  hairLength: HairLength;
  eyeColor: EyeColor;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  attributes: CharacterAttributes;
}

// ============================================
// Game State
// ============================================

export type GameMode = 'board-only' | 'with-questions';
export type RoomState = 'waiting' | 'playing' | 'finished';

export interface Player {
  id: string;
  name: string;
  ready: boolean;
  connected: boolean;
}

export interface Question {
  id: string;
  from: string; // player id
  fromName: string;
  text: string;
  answer: 'yes' | 'no' | null;
  timestamp: number;
}

export interface GameSettings {
  mode: GameMode;
  showSuggestions: boolean;
}

export interface GameResult {
  winner: string;
  winnerName: string;
  loser: string;
  loserName: string;
  winnerCharacter: Character;
  loserCharacter: Character;
  guessedCharacter: Character;
  correct: boolean;
}

export interface GameState {
  roomCode: string;
  players: Player[];
  state: RoomState;
  settings: GameSettings;
  currentTurn: string | null; // player id (only used in with-questions mode)
  questionHistory: Question[];
  pendingQuestion: Question | null;
  winner: string | null;
  loser: string | null;
  gameResult: GameResult | null;
}

// ============================================
// Client-side state (extends server state)
// ============================================

export interface ClientGameState extends GameState {
  myId: string;
  mySecretCharacter: Character | null;
  crossedOut: Set<string>; // character ids I've crossed out
}

// ============================================
// Socket Events
// ============================================

export interface ServerToClientEvents {
  'room-created': (data: { roomCode: string }) => void;
  'player-joined': (data: { players: Player[] }) => void;
  'player-disconnected': (data: { playerId: string; playerName: string }) => void;
  'player-reconnected': (data: { playerId: string; playerName: string }) => void;
  'settings-updated': (data: { settings: GameSettings }) => void;
  'game-started': (data: {
    secretCharacter: Character;
    currentTurn: string | null;
    players: Player[];
  }) => void;
  'question-asked': (data: { question: Question }) => void;
  'question-answered': (data: { question: Question; nextTurn: string }) => void;
  'game-over': (data: {
    winner: string;
    winnerName: string;
    loser: string;
    loserName: string;
    winnerCharacter: Character;
    loserCharacter: Character;
    guessedCharacter: Character;
    correct: boolean;
  }) => void;
  'rematch-requested': (data: { from: string; fromName: string }) => void;
  'game-restarted': (data: {
    secretCharacter: Character;
    currentTurn: string | null;
    players: Player[];
    settings: GameSettings;
  }) => void;
  'error': (data: { message: string }) => void;
  'room-state': (data: {
    gameState: GameState;
    secretCharacter: Character | null;
    crossedOut: string[];
  }) => void;
}

export interface ClientToServerEvents {
  'create-room': (data: { playerName: string; playerId: string }) => void;
  'join-room': (data: { roomCode: string; playerName: string; playerId: string }) => void;
  'rejoin-room': (data: { playerId: string; roomCode: string }) => void;
  'player-ready': (data: { roomCode: string }) => void;
  'update-settings': (data: { roomCode: string; settings: GameSettings }) => void;
  'ask-question': (data: { roomCode: string; question: string }) => void;
  'answer-question': (data: { roomCode: string; questionId: string; answer: 'yes' | 'no' }) => void;
  'toggle-card': (data: { roomCode: string; characterId: string }) => void;
  'final-guess': (data: { roomCode: string; characterId: string }) => void;
  'rematch': (data: { roomCode: string }) => void;
}
