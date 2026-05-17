"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GameData } from "@/hooks/use-game-state";
import { characters } from "@/lib/characters";
import CharacterCard from "./character-card";
import QuestionPanel from "./question-panel";
import FinalGuessDialog from "./final-guess-dialog";
import SuggestedQuestions from "./suggested-questions";

export default function GameBoard({ game }: { game: GameData }) {
  const router = useRouter();
  const [showGuessDialog, setShowGuessDialog] = useState(false);

  const isQuestionsMode = game.settings.mode === "with-questions";

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid hsl(230, 15%, 20%)",
          background: "hsla(230, 20%, 12%, 0.9)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 30,
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Home Button */}
        <button
          onClick={() => router.push("/")}
          style={{
            background: "transparent",
            border: "1px solid hsl(230, 15%, 25%)",
            color: "hsl(230, 10%, 60%)",
            padding: "0.4rem 0.75rem",
            borderRadius: "0.5rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "hsl(230, 15%, 35%)";
            e.currentTarget.style.color = "hsl(0, 0%, 95%)";
            e.currentTarget.style.background = "hsl(230, 18%, 18%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "hsl(230, 15%, 25%)";
            e.currentTarget.style.color = "hsl(230, 10%, 60%)";
            e.currentTarget.style.background = "transparent";
          }}
          id="home-btn"
        >
          ← Home
        </button>

        {/* Secret Character */}
        {game.mySecret && (
          <div className="secret-badge">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "0.5rem",
                background: "hsl(230, 18%, 25%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                fontWeight: 700,
                overflow: "hidden",
              }}
            >
              {game.mySecret.avatar ? (
                <img
                  src={game.mySecret.avatar}
                  alt={game.mySecret.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.textContent = game.mySecret!.name[0];
                  }}
                />
              ) : (
                game.mySecret.name[0]
              )}
            </div>
            <div>
              <div
                style={{ fontSize: "0.65rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                You are
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                {game.mySecret.name}
              </div>
            </div>
          </div>
        )}

        {/* Turn Indicator (questions mode only) */}
        {isQuestionsMode && (
          <div
            className={game.isMyTurn ? "pulse-glow" : ""}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              background: game.isMyTurn
                ? "hsla(45, 93%, 58%, 0.15)"
                : "hsl(230, 18%, 18%)",
              border: `1px solid ${game.isMyTurn ? "hsl(45, 93%, 58%)" : "hsl(230, 15%, 25%)"}`,
              fontSize: "0.85rem",
              fontWeight: 600,
              color: game.isMyTurn ? "hsl(45, 93%, 68%)" : "hsl(230, 10%, 60%)",
            }}
          >
            {game.isMyTurn ? "🟡 Your Turn" : `⏳ ${game.opponent?.name || "Opponent"}'s Turn`}
          </div>
        )}

        {/* Opponent info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          <span style={{ color: "hsl(230, 10%, 60%)" }}>vs</span>
          <span style={{ fontWeight: 600 }}>
            {game.opponent?.name || "..."}
          </span>
          {game.opponent && !game.opponent.connected && (
            <span className="badge badge-danger" style={{ fontSize: "0.65rem" }}>
              Disconnected
            </span>
          )}
        </div>

        {/* Final Guess Button */}
        <button
          className="btn-danger btn-sm"
          onClick={() => setShowGuessDialog(true)}
          disabled={isQuestionsMode && !game.isMyTurn}
          id="final-guess-btn"
        >
          🎯 Final Guess
        </button>
      </header>

      {/* Game Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "0.75rem",
          padding: "0.75rem",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Character Grid */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {/* Suggested Questions (shown in both modes if enabled) */}
          {game.settings.showSuggestions && (
            <SuggestedQuestions
              game={game}
              crossedOut={game.crossedOut}
            />
          )}

          <div className="character-grid">
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isCrossedOut={game.crossedOut.has(char.id)}
                onToggle={() => game.toggleCard(char.id)}
                isSecret={game.mySecret?.id === char.id}
              />
            ))}
          </div>
        </div>

        {/* Question Panel (questions mode only) */}
        {isQuestionsMode && (
          <div
            style={{
              width: "320px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
            className="question-panel-desktop"
          >
            <QuestionPanel game={game} />
          </div>
        )}
      </div>

      {/* Final Guess Dialog */}
      {showGuessDialog && (
        <FinalGuessDialog
          game={game}
          onClose={() => setShowGuessDialog(false)}
        />
      )}

      <style jsx>{`
        @media (max-width: 767px) {
          .question-panel-desktop {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
