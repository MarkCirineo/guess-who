"use client";

import { useEffect, useRef } from "react";
import type { GameData } from "@/hooks/use-game-state";

export default function GameOverScreen({ game }: { game: GameData }) {
  const confettiRef = useRef(false);

  useEffect(() => {
    if (game.iWon && !confettiRef.current) {
      confettiRef.current = true;
      // Dynamic import to avoid SSR issues
      import("canvas-confetti").then((confettiModule) => {
        const confetti = confettiModule.default;
        // Fire confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#4b83f0", "#3b82f6", "#eab308"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#4b83f0", "#3b82f6", "#eab308"],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      });
    }
  }, [game.iWon]);

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
      <div className="glass animate-slide-in" style={{ padding: "2.5rem", maxWidth: "480px", width: "100%" }}>
        {/* Result Icon */}
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
          {game.iWon ? "🎉" : "😔"}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 900,
            marginBottom: "0.5rem",
            background: game.iWon
              ? "linear-gradient(135deg, hsl(45, 93%, 58%), hsl(142, 71%, 55%))"
              : "linear-gradient(135deg, hsl(0, 72%, 51%), hsl(0, 72%, 65%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {game.iWon ? "You Win!" : "You Lose!"}
        </h1>

        <p
          style={{
            color: "hsl(230, 10%, 60%)",
            fontSize: "1rem",
            marginBottom: "2rem",
          }}
        >
          {game.wasCorrect
            ? `${game.winnerName} correctly guessed the character!`
            : `${game.loserName} guessed wrong and lost!`}
        </p>

        {/* Character Reveal */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {game.winnerCharacter && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, hsl(230, 18%, 22%), hsl(230, 18%, 28%))",
                  margin: "0 auto 0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "hsl(230, 10%, 40%)",
                  overflow: "hidden",
                  border: "2px solid hsl(142, 71%, 45%)",
                }}
              >
                {game.winnerCharacter.avatar ? (
                  <img
                    src={game.winnerCharacter.avatar}
                    alt={game.winnerCharacter.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.textContent = game.winnerCharacter!.name[0];
                    }}
                  />
                ) : (
                  game.winnerCharacter.name[0]
                )}
              </div>
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {game.winnerCharacter.name}
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "hsl(142, 71%, 45%)",
                }}
              >
                {game.winnerName}&apos;s character
              </p>
            </div>
          )}
          {game.loserCharacter && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, hsl(230, 18%, 22%), hsl(230, 18%, 28%))",
                  margin: "0 auto 0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "hsl(230, 10%, 40%)",
                  overflow: "hidden",
                  border: "2px solid hsl(0, 72%, 51%)",
                }}
              >
                {game.loserCharacter.avatar ? (
                  <img
                    src={game.loserCharacter.avatar}
                    alt={game.loserCharacter.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.textContent = game.loserCharacter!.name[0];
                    }}
                  />
                ) : (
                  game.loserCharacter.name[0]
                )}
              </div>
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {game.loserCharacter.name}
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "hsl(0, 72%, 51%)",
                }}
              >
                {game.loserName}&apos;s character
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            className={`${game.rematchRequested ? "btn-success" : "btn-primary"}`}
            onClick={game.requestRematch}
            disabled={game.rematchRequested}
            style={{ width: "100%", padding: "1rem", fontSize: "1.05rem" }}
            id="rematch-btn"
          >
            {game.rematchRequested
              ? game.opponentWantsRematch
                ? "Starting rematch..."
                : "✓ Rematch Requested — Waiting..."
              : game.opponentWantsRematch
              ? "🔄 Accept Rematch"
              : "🔄 Play Again"}
          </button>
          <button
            className="btn-secondary"
            onClick={() => (window.location.href = "/")}
            style={{ width: "100%" }}
          >
            Leave Game
          </button>
        </div>

        {game.opponentWantsRematch && !game.rematchRequested && (
          <p
            style={{
              marginTop: "0.75rem",
              color: "hsl(45, 93%, 58%)",
              fontSize: "0.85rem",
            }}
          >
            {game.opponent?.name} wants a rematch!
          </p>
        )}
      </div>
    </main>
  );
}
