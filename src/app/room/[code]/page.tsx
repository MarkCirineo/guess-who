"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useGameState } from "@/hooks/use-game-state";
import WaitingRoom from "@/components/game/waiting-room";
import GameBoard from "@/components/game/game-board";
import GameOverScreen from "@/components/game/game-over-screen";
import ReconnectingOverlay from "@/components/game/reconnecting-overlay";

export default function RoomPage() {
  const params = useParams();
  const rawCode = (params.code as string)?.toUpperCase();
  const isNewRoom = rawCode === "NEW";
  const game = useGameState();

  // ── State ──────────────────────────────────────────────────────────
  // IMPORTANT: We NEVER read sessionStorage during render.
  // Doing so causes a hydration mismatch (server has no sessionStorage →
  // renders one UI; client has it → renders different UI). React's
  // hydration error recovery breaks event handlers, causing "button does
  // nothing" symptoms.
  //
  // Instead, storedName starts as null on BOTH server and client,
  // and we read sessionStorage in a useEffect (client-only).
  const [storedName, setStoredName] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const joinSentRef = useRef(false);

  // ── Effect 0: Detect bfcache restoration (Ctrl+Shift+T) ───────────
  // When a tab is restored from bfcache, JS state is frozen/stale and
  // the socket is dead. Force a clean reload.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // ── Effect 1: Read sessionStorage after hydration ─────────────────
  useEffect(() => {
    const name = sessionStorage.getItem("gw-player-name");
    if (name) {
      setStoredName(name);
    }
    setHydrated(true);
  }, []);

  // Derived state (only meaningful after hydration)
  const needsNameEntry = hydrated && !storedName && !nameSubmitted && !isNewRoom;
  const activeName = storedName || (nameSubmitted ? enteredName.trim() : "Player");

  const handleNameSubmit = () => {
    if (!enteredName.trim()) {
      setNameError("Enter your name to join");
      return;
    }
    setNameError("");
    const name = enteredName.trim();
    sessionStorage.setItem("gw-player-name", name);
    setStoredName(name);
    setNameSubmitted(true);
  };

  // ── Effect 2: Auto-join/create once we have a name + socket ───────
  // Uses a retry interval to be immune to React timing edge cases
  // (Strict Mode double-mount, tab restoration, socket connect delays).
  useEffect(() => {
    if (!hydrated) return;
    if (needsNameEntry) return;
    if (joinSentRef.current) return;

    const tryJoin = () => {
      if (joinSentRef.current) return true;
      if (!game.myId) return false; // socket not connected yet

      joinSentRef.current = true;
      if (isNewRoom) {
        game.createRoom(activeName);
      } else {
        game.joinRoom(rawCode, activeName);
      }
      return true;
    };

    // Try immediately
    if (tryJoin()) return;

    // Retry every 300ms until socket is connected
    const interval = setInterval(() => {
      if (tryJoin()) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [hydrated, needsNameEntry, game.myId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update the URL from /room/NEW to /room/ACTUAL_CODE once the room is created
  useEffect(() => {
    if (isNewRoom && game.roomCode) {
      window.history.replaceState(null, "", `/room/${game.roomCode}`);
    }
  }, [game.roomCode, isNewRoom]);

  const displayCode = game.roomCode || rawCode;

  // Before hydration, show a brief connecting state (server and client
  // both render this, so no hydration mismatch)
  if (!hydrated) {
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
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            🎭
          </div>
          <p style={{ color: "hsl(230, 10%, 50%)", fontSize: "0.9rem" }}>
            Connecting...
          </p>
          {/* Refresh prompt — appears after 3s via pure CSS (works even if
              React is frozen from bfcache). Uses <a href=""> for a no-JS reload. */}
          <div
            style={{
              marginTop: "2rem",
              opacity: 0,
              animation: "fadeIn 0.4s ease forwards",
              animationDelay: "3s",
            }}
          >
            <p style={{ color: "hsl(230, 10%, 45%)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              Taking too long?
            </p>
            <a
              href=""
              style={{
                display: "inline-block",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%))",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              🔄 Refresh Page
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Name entry gate — shown when user arrives via shared link without a stored name
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
    return (
      <>
        {game.isReconnecting && <ReconnectingOverlay />}
        <GameOverScreen game={game} />
      </>
    );
  }

  if (game.screenState === "playing") {
    return (
      <>
        {game.isReconnecting && <ReconnectingOverlay />}
        <GameBoard game={game} />
      </>
    );
  }

  // Show loading state while creating a new room (before server assigns a code)
  if (isNewRoom && !game.roomCode) {
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
        <div className="animate-slide-in" style={{ textAlign: "center" }}>
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              border: "3px solid hsla(220, 83%, 68%, 0.2)",
              borderTopColor: "hsl(220, 83%, 68%)",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 1.25rem",
            }}
          />
          <p
            style={{
              color: "hsl(230, 10%, 60%)",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            Creating Room…
          </p>
          <p
            style={{
              color: "hsl(230, 10%, 40%)",
              fontSize: "0.85rem",
              marginTop: "0.5rem",
            }}
          >
            Setting up your game
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      {game.isReconnecting && <ReconnectingOverlay />}
      <WaitingRoom game={game} roomCode={displayCode} />
    </>
  );
}
