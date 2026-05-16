"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGameState } from "@/hooks/use-game-state";
import WaitingRoom from "@/components/game/waiting-room";
import GameBoard from "@/components/game/game-board";
import GameOverScreen from "@/components/game/game-over-screen";

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawCode = (params.code as string)?.toUpperCase();
  const isNewRoom = rawCode === "NEW";
  const nameFromUrl = searchParams.get("name");
  const game = useGameState();

  // If no name was provided in the URL (e.g. user clicked a shared link),
  // gate the join behind a name entry prompt.
  const [enteredName, setEnteredName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");

  // The effective name: either from URL params or from the entry form
  const needsNameEntry = !nameFromUrl && !nameSubmitted && !isNewRoom;
  const activeName = nameFromUrl || (nameSubmitted ? enteredName : "Player");

  const handleNameSubmit = () => {
    if (!enteredName.trim()) {
      setNameError("Enter your name to join");
      return;
    }
    setNameError("");
    setNameSubmitted(true);
  };

  // Create or join room once the socket is ready AND we have a name.
  // No ref guard needed — cleanup clears the timer, so Strict Mode's
  // mount→cleanup→mount cycle works correctly: T1 starts, T1 cleared, T2 starts, T2 fires.
  useEffect(() => {
    if (needsNameEntry) return; // Wait for name entry

    const timer = setTimeout(() => {
      if (isNewRoom) {
        game.createRoom(activeName);
      } else {
        game.joinRoom(rawCode, activeName);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [needsNameEntry]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update the URL from /room/NEW to /room/ACTUAL_CODE once the room is created
  useEffect(() => {
    if (isNewRoom && game.roomCode) {
      window.history.replaceState(null, "", `/room/${game.roomCode}?name=${encodeURIComponent(activeName)}`);
    }
  }, [game.roomCode, isNewRoom, activeName]);

  const displayCode = game.roomCode || rawCode;

  // Name entry gate — shown when user arrives via shared link without ?name=
  if (needsNameEntry) {
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
        <div
          className="animate-slide-in"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎭</div>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%), hsl(45, 93%, 58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            Join Game
          </h1>
          <p style={{ color: "hsl(230, 10%, 60%)", fontSize: "1rem" }}>
            You&apos;ve been invited to room{" "}
            <span
              style={{
                fontWeight: 700,
                color: "hsl(220, 83%, 68%)",
                letterSpacing: "0.1em",
              }}
            >
              {rawCode}
            </span>
          </p>
        </div>

        <div
          className="glass animate-slide-in"
          style={{
            padding: "2rem",
            maxWidth: "420px",
            width: "100%",
            animationDelay: "0.1s",
          }}
        >
          <div
            className="animate-fade-in"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              What&apos;s your name?
            </h2>
            <input
              className="input"
              placeholder="Your name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
              maxLength={20}
              autoFocus
              id="link-join-name-input"
            />
            {nameError && (
              <p style={{ color: "hsl(0, 72%, 51%)", fontSize: "0.875rem" }}>
                {nameError}
              </p>
            )}
            <button
              className="btn-primary"
              onClick={handleNameSubmit}
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
              id="link-join-submit"
            >
              🚀 Join Game
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Error display
  if (game.error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div className="glass" style={{ padding: "2rem", maxWidth: "400px" }}>
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>😕</p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Oops
          </h2>
          <p style={{ color: "hsl(230, 10%, 60%)", marginBottom: "1.5rem" }}>
            {game.error}
          </p>
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  if (game.screenState === "finished") {
    return <GameOverScreen game={game} />;
  }

  if (game.screenState === "playing") {
    return <GameBoard game={game} />;
  }

  return <WaitingRoom game={game} roomCode={displayCode} />;
}
