"use client";

import { useState } from "react";
import type { GameData } from "@/hooks/use-game-state";
import { characters } from "@/lib/characters";
import CharacterCard from "./character-card";

interface FinalGuessDialogProps {
  game: GameData;
  onClose: () => void;
}

export default function FinalGuessDialog({ game, onClose }: FinalGuessDialogProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const handleGuess = () => {
    if (!selectedId) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    game.makeGuess(selectedId);
    onClose();
  };

  const selectedCharacter = characters.find((c) => c.id === selectedId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "750px", maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            🎯 Final Guess
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "hsl(230, 10%, 50%)",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.25rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {!confirming ? (
          <>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              Select the character you think your opponent is. Be careful —
              <strong style={{ color: "hsl(0, 72%, 51%)" }}>
                {" "}a wrong guess means you lose!
              </strong>
            </p>

            <div
              className="final-guess-grid"
              style={{
                gap: "0.5rem",
                maxHeight: "55vh",
                overflowY: "auto",
                padding: "0.25rem",
              }}
            >
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  isCrossedOut={game.crossedOut.has(char.id)}
                  onToggle={() => {}}
                  isSelectable
                  isSelected={selectedId === char.id}
                  onSelect={() => setSelectedId(char.id)}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={handleGuess}
                disabled={!selectedId}
                style={{ flex: 2 }}
                id="confirm-guess-btn"
              >
                {selectedId
                  ? `Guess ${selectedCharacter?.name}`
                  : "Select a character"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              ⚠️
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Are you sure?
            </p>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                marginBottom: "0.5rem",
              }}
            >
              You&apos;re guessing that your opponent is:
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1.5rem",
              }}
            >
              {selectedCharacter?.name}
            </p>
            <p
              style={{
                color: "hsl(0, 72%, 60%)",
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              If you&apos;re wrong, you lose immediately.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                className="btn-secondary"
                onClick={() => setConfirming(false)}
                style={{ flex: 1 }}
              >
                Go Back
              </button>
              <button
                className="btn-danger"
                onClick={handleGuess}
                style={{ flex: 2 }}
                id="final-confirm-btn"
              >
                I&apos;m Sure — Guess {selectedCharacter?.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
