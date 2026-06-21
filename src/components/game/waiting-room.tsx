"use client";

import { useState, useEffect } from "react";
import type { GameData } from "@/hooks/use-game-state";

interface WaitingRoomProps {
  game: GameData;
  roomCode: string;
}

export default function WaitingRoom({ game, roomCode }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false);

  // Compute share URL in useEffect to avoid hydration mismatch
  // (server has no window.location.origin)
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(`${window.location.origin}/room/${roomCode}`);
  }, [roomCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHost = game.players.length > 0 && game.players[0]?.id === game.myId;

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
        className="glass animate-slide-in"
        style={{ padding: "2rem", maxWidth: "480px", width: "100%" }}
      >
        {/* Room Code */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p
            style={{
              color: "hsl(230, 10%, 60%)",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Room Code
          </p>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              letterSpacing: "0.3em",
              background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {roomCode}
          </div>
        </div>

        {/* Share Link */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <input
            className="input"
            value={shareUrl}
            readOnly
            style={{ fontSize: "0.8rem", flex: 1 }}
            id="share-link-input"
          />
          <button
            className="btn-secondary btn-sm"
            onClick={handleCopy}
            style={{ whiteSpace: "nowrap" }}
            id="copy-link-btn"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
        </div>

        {/* Players */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "hsl(230, 10%, 60%)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.75rem",
            }}
          >
            Players ({game.players.length}/2)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {game.players.map((player, i) => (
              <div
                key={player.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  background: "hsl(230, 18%, 18%)",
                  border: "1px solid hsl(230, 15%, 25%)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>
                    {i === 0 ? "👑" : "🎮"}
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {player.name}
                    {player.id === game.myId && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "hsl(230, 10%, 50%)",
                          marginLeft: "0.5rem",
                        }}
                      >
                        (you)
                      </span>
                    )}
                  </span>
                </div>
                {player.ready ? (
                  <span className="badge badge-success">Ready</span>
                ) : (
                  <span className="badge badge-warning">Waiting</span>
                )}
              </div>
            ))}
            {game.players.length < 2 && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  border: "2px dashed hsl(230, 15%, 25%)",
                  textAlign: "center",
                  color: "hsl(230, 10%, 40%)",
                  fontSize: "0.875rem",
                }}
              >
                Waiting for another player to join...
              </div>
            )}
          </div>
        </div>

        {/* Game Settings (Host Only) */}
        {isHost && game.players.length >= 1 && (
          <div
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "hsl(230, 18%, 14%)",
              border: "1px solid hsl(230, 15%, 22%)",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "hsl(230, 10%, 60%)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
              }}
            >
              Game Settings
            </h3>

            {/* Game Mode */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Question Mode</p>
                <p style={{ fontSize: "0.75rem", color: "hsl(230, 10%, 50%)" }}>
                  {game.settings.mode === "board-only"
                    ? "Just the board — talk on Discord/in person"
                    : "Turn-based Q&A in-app"}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  className={`btn-sm ${game.settings.mode === "board-only" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => game.updateSettings({ mode: "board-only" })}
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                >
                  Board Only
                </button>
                <button
                  className={`btn-sm ${game.settings.mode === "with-questions" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => game.updateSettings({ mode: "with-questions" })}
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                >
                  With Chat
                </button>
              </div>
            </div>

            {/* Suggested Questions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Suggested Questions</p>
                <p style={{ fontSize: "0.75rem", color: "hsl(230, 10%, 50%)" }}>
                  Show helpful question hints
                </p>
              </div>
              <div
                className={`toggle ${game.settings.showSuggestions ? "active" : ""}`}
                onClick={() =>
                  game.updateSettings({ showSuggestions: !game.settings.showSuggestions })
                }
                id="toggle-suggestions"
              />
            </div>
          </div>
        )}

        {/* Settings display for non-host */}
        {!isHost && game.players.length >= 2 && (
          <div
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "hsl(230, 18%, 14%)",
              border: "1px solid hsl(230, 15%, 22%)",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: "hsl(230, 10%, 50%)" }}>
              Mode:{" "}
              <span style={{ color: "hsl(0, 0%, 95%)", fontWeight: 600 }}>
                {game.settings.mode === "board-only" ? "Board Only" : "With Questions"}
              </span>
              {" · "}
              Suggestions:{" "}
              <span style={{ color: "hsl(0, 0%, 95%)", fontWeight: 600 }}>
                {game.settings.showSuggestions ? "On" : "Off"}
              </span>
            </p>
          </div>
        )}

        {/* Ready Button */}
        {game.players.length === 2 && (
          <button
            className={`${game.myPlayer?.ready ? "btn-success" : "btn-primary"}`}
            onClick={() => !game.myPlayer?.ready && game.setReady()}
            disabled={game.myPlayer?.ready}
            style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
            id="ready-btn"
          >
            {game.myPlayer?.ready ? "✓ Ready — Waiting for opponent" : "I'm Ready!"}
          </button>
        )}
      </div>

      {/* ArcadeKit cross-promo — only while waiting for player 2 */}
      {game.players.length < 2 && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: "1.5rem",
            maxWidth: "480px",
            width: "100%",
            animationDelay: "1s",
            animationFillMode: "both",
          }}
        >
          <a
            href="https://arcadekit.games"
            target="_blank"
            rel="noopener"
            className="network-link"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              background: "hsla(230, 20%, 15%, 0.35)",
              border: "1px solid hsla(230, 15%, 30%, 0.25)",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
            id="arcadekit-waiting-link"
          >
            <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>While you wait...</span>
            <span>
              Check out{" "}
              <span style={{ fontWeight: 700 }}>ArcadeKit</span>
            </span>
            <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>→</span>
          </a>
        </div>
      )}
    </main>
  );
}
