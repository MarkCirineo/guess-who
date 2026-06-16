"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = useCallback(() => {
    if (!playerName.trim()) {
      setError("Enter your name");
      return;
    }
    setIsCreating(true);
    setError("");
    sessionStorage.setItem("gw-player-name", playerName.trim());
    router.push("/room/new");
  }, [playerName, router]);

  const handleJoin = () => {
    if (!playerName.trim()) {
      setError("Enter your name");
      return;
    }
    if (!roomCode.trim()) {
      setError("Enter a room code");
      return;
    }
    sessionStorage.setItem("gw-player-name", playerName.trim());
    router.push(`/room/${roomCode.toUpperCase().trim()}`);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Hero */}
      <div
        className="animate-slide-in"
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "0.5rem",
          }}
        >
          🎭
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%), hsl(45, 93%, 58%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
          }}
        >
          Guess Who
          <br />
          Online
        </h1>
        <p
          style={{
            color: "hsl(230, 10%, 60%)",
            fontSize: "1.1rem",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          The classic board game, now playable with friends anywhere.
        </p>
      </div>

      {/* Main Card */}
      <div
        className="glass animate-slide-in"
        style={{
          padding: "2rem",
          maxWidth: "420px",
          width: "100%",
          animationDelay: "0.1s",
        }}
      >
        {!showCreate && !showJoin ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button
              className="btn-primary"
              onClick={() => setShowCreate(true)}
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
              id="create-game-btn"
            >
              🎲 Create Game
            </button>
            <button
              className="btn-secondary"
              onClick={() => setShowJoin(true)}
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
              id="join-game-btn"
            >
              🔗 Join Game
            </button>
            <button
              className="btn-secondary"
              onClick={() => router.push("/local")}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.9rem",
                opacity: 0.7,
              }}
              id="local-play-btn"
            >
              📱 Local Pass & Play
            </button>
          </div>
        ) : showCreate ? (
          <div
            className="animate-fade-in"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Create a Game</h2>
            <input
              className="input"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              maxLength={20}
              autoFocus
              id="create-name-input"
            />
            {error && (
              <p style={{ color: "hsl(0, 72%, 51%)", fontSize: "0.875rem" }}>
                {error}
              </p>
            )}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowCreate(false);
                  setError("");
                }}
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button
                className="btn-primary"
                onClick={handleCreate}
                disabled={isCreating}
                style={{ flex: 2, position: "relative", opacity: isCreating ? 0.7 : 1 }}
                id="create-room-submit"
              >
                {isCreating ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        width: "1rem",
                        height: "1rem",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Creating…
                  </span>
                ) : (
                  "Create Room"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div
            className="animate-fade-in"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Join a Game</h2>
            <input
              className="input"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              autoFocus
              id="join-name-input"
            />
            <input
              className="input"
              placeholder="Room code (e.g. ABC123)"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              maxLength={6}
              style={{ textTransform: "uppercase", letterSpacing: "0.15em", textAlign: "center" }}
              id="join-code-input"
            />
            {error && (
              <p style={{ color: "hsl(0, 72%, 51%)", fontSize: "0.875rem" }}>
                {error}
              </p>
            )}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowJoin(false);
                  setError("");
                }}
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button
                className="btn-primary"
                onClick={handleJoin}
                style={{ flex: 2 }}
                id="join-room-submit"
              >
                Join Room
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "2rem",
          color: "hsl(230, 10%, 35%)",
          fontSize: "0.8rem",
        }}
      >
        No account needed · Just create &amp; play ·{" "}
        <a
          href="/about"
          style={{ color: "hsl(230, 10%, 45%)", textDecoration: "underline" }}
        >
          About
        </a>
        {" · "}
        <a
          href="/privacy"
          style={{ color: "hsl(230, 10%, 45%)", textDecoration: "underline" }}
        >
          Privacy Policy
        </a>
      </p>
    </main>
  );
}
