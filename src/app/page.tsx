"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

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

      {/* Content Sections — crawlable text for SEO */}
      <div
        className="animate-slide-in"
        style={{
          maxWidth: "680px",
          width: "100%",
          marginTop: "3rem",
          animationDelay: "0.2s",
        }}
      >
        {/* What is Guess Who Online */}
        <section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            What is Guess Who Online?
          </h2>
          <p
            style={{
              color: "hsl(230, 10%, 60%)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Guess Who Online is a free, browser-based version of the classic
            two-player board game. Each player is secretly assigned one of 24
            unique characters. Take turns asking yes-or-no questions to
            narrow down the possibilities and be the first to guess your
            opponent&apos;s character. Play with friends in real-time using
            a simple room code — no downloads, no sign-ups, no hassle.
          </p>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            How It Works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <StepCard emoji="🎲" title="Create a Room" desc="Click Create Game and get a unique room code to share with your friend." />
            <StepCard emoji="🔗" title="Share the Code" desc="Your friend enters the code to join instantly — no accounts needed." />
            <StepCard emoji="🎭" title="Start Guessing" desc="Ask questions, eliminate characters, and race to guess first!" />
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.85rem",
            }}
          >
            <Link
              href="/how-to-play"
              style={{ color: "hsl(220, 83%, 68%)", textDecoration: "none" }}
            >
              Read the full rules &amp; strategy guide →
            </Link>
          </p>
        </section>

        {/* Features */}
        <section style={{ marginBottom: "1rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Features
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <FeatureItem emoji="⚡" text="Real-time multiplayer — play with anyone, anywhere in the world" />
            <FeatureItem emoji="🙅" text="No sign-up required — just pick a name and start playing" />
            <FeatureItem emoji="🎮" text="Two game modes — online multiplayer or local pass & play on one device" />
            <FeatureItem emoji="👥" text="24 unique characters — each with their own look and traits" />
            <FeatureItem emoji="💬" text="Built-in Q&A system — or use Board Only mode with voice chat" />
            <FeatureItem emoji="🔄" text="Instant rematch — jump right back in after every game" />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

function StepCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="glass"
      style={{
        padding: "1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.35rem" }}>
        {title}
      </h3>
      <p style={{ color: "hsl(230, 10%, 55%)", fontSize: "0.8rem", lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

function FeatureItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.6rem",
        padding: "0.5rem 0",
      }}
    >
      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{emoji}</span>
      <span style={{ color: "hsl(230, 10%, 60%)", fontSize: "0.85rem", lineHeight: 1.6 }}>
        {text}
      </span>
    </div>
  );
}
