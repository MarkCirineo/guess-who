"use client";

import { useMemo } from "react";
import type { GameData } from "@/hooks/use-game-state";
import { characters, getUsefulQuestions } from "@/lib/characters";

interface SuggestedQuestionsProps {
  game: GameData;
  crossedOut: Set<string>;
}

export default function SuggestedQuestions({
  game,
  crossedOut,
}: SuggestedQuestionsProps) {
  const remainingCharacters = useMemo(() => {
    return characters.filter((c) => !crossedOut.has(c.id));
  }, [crossedOut]);

  const useful = useMemo(() => {
    return getUsefulQuestions(remainingCharacters);
  }, [remainingCharacters]);

  if (useful.length === 0) return null;

  const handleClick = (text: string) => {
    if (game.settings.mode === "with-questions" && game.isMyTurn && !game.pendingQuestion) {
      game.askQuestion(text);
    }
  };

  // Show max 6 suggestions to avoid cluttering
  const displayed = useful.slice(0, 6);

  return (
    <div
      style={{
        marginBottom: "0.5rem",
        padding: "0.5rem 0.75rem",
        borderRadius: "0.75rem",
        background: "hsla(230, 20%, 15%, 0.5)",
        border: "1px solid hsl(230, 15%, 22%)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "hsl(230, 10%, 50%)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.35rem",
        }}
      >
        💡 Suggested Questions ({remainingCharacters.length} characters remaining)
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.375rem",
        }}
      >
        {displayed.map((q, i) => {
          const isClickable =
            game.settings.mode === "with-questions" &&
            game.isMyTurn &&
            !game.pendingQuestion;

          return (
            <button
              key={i}
              onClick={() => handleClick(q.text)}
              disabled={!isClickable}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "9999px",
                background: "hsl(230, 18%, 20%)",
                border: "1px solid hsl(230, 15%, 28%)",
                color: isClickable ? "hsl(0, 0%, 90%)" : "hsl(230, 10%, 45%)",
                fontSize: "0.75rem",
                cursor: isClickable ? "pointer" : "default",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (isClickable) {
                  (e.target as HTMLElement).style.borderColor = "hsl(220, 83%, 58%)";
                  (e.target as HTMLElement).style.background = "hsl(220, 30%, 20%)";
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "hsl(230, 15%, 28%)";
                (e.target as HTMLElement).style.background = "hsl(230, 18%, 20%)";
              }}
            >
              {q.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
