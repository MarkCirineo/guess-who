"use client";

import { useState, useRef, useEffect } from "react";
import type { GameData } from "@/hooks/use-game-state";

export default function QuestionPanel({ game }: { game: GameData }) {
  const [question, setQuestion] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [game.questionHistory, game.pendingQuestion]);

  const handleAsk = () => {
    if (!question.trim()) return;
    game.askQuestion(question.trim());
    setQuestion("");
  };

  const needsAnswer =
    game.pendingQuestion &&
    game.pendingQuestion.from !== game.myId &&
    game.pendingQuestion.answer === null;

  return (
    <div
      className="glass-strong"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.75rem 1rem",
          borderBottom: "1px solid hsl(230, 15%, 22%)",
          fontWeight: 700,
          fontSize: "0.9rem",
        }}
      >
        💬 Questions
      </div>

      {/* Message History */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {game.questionHistory.length === 0 && !game.pendingQuestion && (
          <p
            style={{
              textAlign: "center",
              color: "hsl(230, 10%, 40%)",
              fontSize: "0.85rem",
              padding: "2rem 0",
            }}
          >
            No questions yet.
            {game.isMyTurn
              ? " Ask a question!"
              : " Waiting for opponent..."}
          </p>
        )}

        {game.questionHistory.map((q) => (
          <div key={q.id} className="question-bubble">
            <div
              style={{
                fontSize: "0.75rem",
                color: "hsl(230, 10%, 50%)",
                marginBottom: "0.25rem",
              }}
            >
              {q.fromName}
            </div>
            <div style={{ fontWeight: 500 }}>{q.text}</div>
            <div className={`answer ${q.answer}`}>
              {q.answer === "yes" ? "✓ Yes" : "✗ No"}
            </div>
          </div>
        ))}

        {/* Pending question */}
        {game.pendingQuestion && (
          <div
            className="question-bubble"
            style={{
              borderColor: "hsl(45, 93%, 58%)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "hsl(230, 10%, 50%)",
                marginBottom: "0.25rem",
              }}
            >
              {game.pendingQuestion.fromName}
            </div>
            <div style={{ fontWeight: 500 }}>{game.pendingQuestion.text}</div>

            {needsAnswer ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                <button
                  className="btn-success btn-sm"
                  onClick={() =>
                    game.answerQuestion(game.pendingQuestion!.id, "yes")
                  }
                  style={{ flex: 1 }}
                  id="answer-yes-btn"
                >
                  ✓ Yes
                </button>
                <button
                  className="btn-danger btn-sm"
                  onClick={() =>
                    game.answerQuestion(game.pendingQuestion!.id, "no")
                  }
                  style={{ flex: 1 }}
                  id="answer-no-btn"
                >
                  ✗ No
                </button>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.8rem",
                  color: "hsl(45, 93%, 58%)",
                  fontStyle: "italic",
                }}
              >
                Waiting for answer...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      {game.isMyTurn && !game.pendingQuestion && (
        <div
          style={{
            padding: "0.75rem",
            borderTop: "1px solid hsl(230, 15%, 22%)",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input
            className="input"
            placeholder="Ask a yes/no question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            style={{ flex: 1, fontSize: "0.875rem" }}
            id="question-input"
          />
          <button
            className="btn-primary btn-sm"
            onClick={handleAsk}
            disabled={!question.trim()}
            id="send-question-btn"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
