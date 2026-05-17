"use client";

import { useState, useCallback, useMemo } from "react";
import { characters, getUsefulQuestions } from "@/lib/characters";
import type { Character } from "@/types/game";
import CharacterCard from "@/components/game/character-card";
import SuggestedQuestions from "@/components/game/suggested-questions";

type LocalPhase = "setup" | "pass" | "playing" | "finished";

interface LocalPlayer {
  name: string;
  secret: Character;
  crossedOut: Set<string>;
}

export default function LocalPage() {
  const [phase, setPhase] = useState<LocalPhase>("setup");
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [players, setPlayers] = useState<[LocalPlayer, LocalPlayer] | null>(null);
  const [activePlayer, setActivePlayer] = useState(0); // 0 or 1
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Guess state
  const [showGuess, setShowGuess] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  // Result state
  const [winner, setWinner] = useState<string | null>(null);
  const [loser, setLoser] = useState<string | null>(null);

  const startGame = () => {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    setPlayers([
      { name: player1Name || "Player 1", secret: shuffled[0], crossedOut: new Set() },
      { name: player2Name || "Player 2", secret: shuffled[1], crossedOut: new Set() },
    ]);
    setActivePlayer(0);
    setPhase("pass");
  };

  const toggleCard = useCallback(
    (charId: string) => {
      if (!players) return;
      setPlayers((prev) => {
        if (!prev) return prev;
        const updated = [...prev] as [LocalPlayer, LocalPlayer];
        const co = new Set(updated[activePlayer].crossedOut);
        if (co.has(charId)) {
          co.delete(charId);
        } else {
          co.add(charId);
        }
        updated[activePlayer] = { ...updated[activePlayer], crossedOut: co };
        return updated;
      });
    },
    [players, activePlayer]
  );

  const endTurn = () => {
    setPhase("pass");
    setActivePlayer((prev) => (prev === 0 ? 1 : 0));
  };

  const handleGuess = () => {
    if (!selectedGuess || !players) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }

    const opponentIdx = activePlayer === 0 ? 1 : 0;
    const correct = players[opponentIdx].secret.id === selectedGuess;

    if (correct) {
      setWinner(players[activePlayer].name);
      setLoser(players[opponentIdx].name);
    } else {
      setWinner(players[opponentIdx].name);
      setLoser(players[activePlayer].name);
    }

    setPhase("finished");
    setShowGuess(false);
  };

  const resetGame = () => {
    setPlayers(null);
    setPhase("setup");
    setActivePlayer(0);
    setWinner(null);
    setLoser(null);
    setSelectedGuess(null);
    setConfirming(false);
    setShowGuess(false);
  };

  const currentPlayer = players?.[activePlayer];

  // Create a fake game-like object for SuggestedQuestions compatibility
  const fakeGameForSuggestions = useMemo(() => ({
    settings: { mode: "board-only" as const, showSuggestions },
    isMyTurn: false,
    pendingQuestion: null,
    askQuestion: () => {},
  }), [showSuggestions]);

  // ---- SETUP ----
  if (phase === "setup") {
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
          style={{ padding: "2rem", maxWidth: "420px", width: "100%" }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            📱 Local Pass & Play
          </h1>
          <p
            style={{
              color: "hsl(230, 10%, 60%)",
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
            }}
          >
            Two players, one device. Take turns and pass it back!
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label
                style={{ fontSize: "0.8rem", color: "hsl(230, 10%, 60%)", display: "block", marginBottom: "0.25rem" }}
              >
                Player 1
              </label>
              <input
                className="input"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Player 1"
                maxLength={20}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.8rem", color: "hsl(230, 10%, 60%)", display: "block", marginBottom: "0.25rem" }}
              >
                Player 2
              </label>
              <input
                className="input"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Player 2"
                maxLength={20}
              />
            </div>

            {/* Suggestions toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                background: "hsl(230, 18%, 14%)",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>Show Suggestions</span>
              <div
                className={`toggle ${showSuggestions ? "active" : ""}`}
                onClick={() => setShowSuggestions(!showSuggestions)}
              />
            </div>

            <button
              className="btn-primary"
              onClick={startGame}
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
            >
              Start Game
            </button>
            <button
              className="btn-secondary"
              onClick={() => (window.location.href = "/")}
              style={{ width: "100%" }}
            >
              ← Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ---- PASS SCREEN ----
  if (phase === "pass") {
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
        <div className="glass animate-slide-in" style={{ padding: "2.5rem", maxWidth: "420px", width: "100%" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔄</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Pass the device to
          </h2>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1.5rem",
            }}
          >
            {currentPlayer?.name}
          </p>
          <p
            style={{
              color: "hsl(230, 10%, 50%)",
              fontSize: "0.875rem",
              marginBottom: "2rem",
            }}
          >
            Make sure the other player isn&apos;t looking!
          </p>
          <button
            className="btn-primary"
            onClick={() => setPhase("playing")}
            style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
          >
            I&apos;m {currentPlayer?.name} — Show My Board
          </button>
        </div>
      </main>
    );
  }

  // ---- FINISHED ----
  if (phase === "finished") {
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
        <div className="glass animate-slide-in" style={{ padding: "2.5rem", maxWidth: "420px", width: "100%" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, hsl(45, 93%, 58%), hsl(142, 71%, 55%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {winner} Wins!
          </h1>
          <p style={{ color: "hsl(230, 10%, 60%)", marginBottom: "2rem" }}>
            Better luck next time, {loser}!
          </p>

          {/* Show both characters */}
          {players && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              {players.map((p, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "1rem",
                      background: "hsl(230, 18%, 22%)",
                      margin: "0 auto 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "hsl(230, 10%, 40%)",
                      overflow: "hidden",
                    }}
                  >
                    {p.secret.avatar ? (
                      <img
                        src={p.secret.avatar}
                        alt={p.secret.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.textContent = p.secret.name[0];
                        }}
                      />
                    ) : (
                      p.secret.name[0]
                    )}
                  </div>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>{p.secret.name}</p>
                  <p style={{ fontSize: "0.7rem", color: "hsl(230, 10%, 50%)" }}>{p.name}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              className="btn-primary"
              onClick={resetGame}
              style={{ width: "100%", padding: "1rem" }}
            >
              🔄 Play Again
            </button>
            <button
              className="btn-secondary"
              onClick={() => (window.location.href = "/")}
              style={{ width: "100%" }}
            >
              ← Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ---- PLAYING ----
  return (
    <main style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
          flexShrink: 0,
        }}
      >
        {/* Secret Character */}
        {currentPlayer && (
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
              {currentPlayer.secret.avatar ? (
                <img
                  src={currentPlayer.secret.avatar}
                  alt={currentPlayer.secret.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.textContent = currentPlayer.secret.name[0];
                  }}
                />
              ) : (
                currentPlayer.secret.name[0]
              )}
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", opacity: 0.8, textTransform: "uppercase" }}>
                {currentPlayer.name} — You are
              </div>
              <div style={{ fontWeight: 700 }}>{currentPlayer.secret.name}</div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn-secondary btn-sm" onClick={endTurn}>
            End Turn ↪
          </button>
          <button
            className="btn-danger btn-sm"
            onClick={() => {
              setShowGuess(true);
              setSelectedGuess(null);
              setConfirming(false);
            }}
          >
            🎯 Final Guess
          </button>
        </div>
      </header>

      {/* Board */}
      <div style={{ flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", minHeight: 0 }}>
        {showSuggestions && currentPlayer && (
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
              💡 Suggested Questions ({characters.filter(c => !currentPlayer.crossedOut.has(c.id)).length} remaining)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {getUsefulQuestions(characters.filter(c => !currentPlayer.crossedOut.has(c.id)))
                .slice(0, 6)
                .map((q, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "9999px",
                      background: "hsl(230, 18%, 20%)",
                      border: "1px solid hsl(230, 15%, 28%)",
                      color: "hsl(230, 10%, 65%)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {q.text}
                  </span>
                ))}
            </div>
          </div>
        )}

        <div className="character-grid">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              isCrossedOut={currentPlayer?.crossedOut.has(char.id) || false}
              onToggle={() => toggleCard(char.id)}
              isSecret={currentPlayer?.secret.id === char.id}
            />
          ))}
        </div>
      </div>

      {/* Final Guess Overlay */}
      {showGuess && (
        <div className="modal-overlay" onClick={() => setShowGuess(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: "700px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
              🎯 Final Guess — {currentPlayer?.name}
            </h2>

            {!confirming ? (
              <>
                <p style={{ color: "hsl(230, 10%, 60%)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                  Who do you think the other player is?
                  <strong style={{ color: "hsl(0, 72%, 51%)" }}> Wrong = you lose!</strong>
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                    gap: "0.5rem",
                    maxHeight: "50vh",
                    overflowY: "auto",
                  }}
                >
                  {characters.map((char) => (
                    <CharacterCard
                      key={char.id}
                      character={char}
                      isCrossedOut={currentPlayer?.crossedOut.has(char.id) || false}
                      onToggle={() => {}}
                      isSelectable
                      isSelected={selectedGuess === char.id}
                      onSelect={() => setSelectedGuess(char.id)}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <button className="btn-secondary" onClick={() => setShowGuess(false)} style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button
                    className="btn-danger"
                    onClick={handleGuess}
                    disabled={!selectedGuess}
                    style={{ flex: 2 }}
                  >
                    {selectedGuess
                      ? `Guess ${characters.find((c) => c.id === selectedGuess)?.name}`
                      : "Select a character"}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem" }}>
                  Final answer: {characters.find((c) => c.id === selectedGuess)?.name}?
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button className="btn-secondary" onClick={() => setConfirming(false)} style={{ flex: 1 }}>
                    Go Back
                  </button>
                  <button className="btn-danger" onClick={handleGuess} style={{ flex: 2 }}>
                    I&apos;m Sure
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
