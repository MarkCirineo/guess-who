"use client";

import { useEffect } from "react";
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
  const name = searchParams.get("name") || "Player";
  const game = useGameState();

  // Create or join room once the socket is ready.
  // No ref guard needed — cleanup clears the timer, so Strict Mode's
  // mount→cleanup→mount cycle works correctly: T1 starts, T1 cleared, T2 starts, T2 fires.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNewRoom) {
        game.createRoom(name);
      } else {
        game.joinRoom(rawCode, name);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update the URL from /room/NEW to /room/ACTUAL_CODE once the room is created
  useEffect(() => {
    if (isNewRoom && game.roomCode) {
      window.history.replaceState(null, "", `/room/${game.roomCode}?name=${encodeURIComponent(name)}`);
    }
  }, [game.roomCode, isNewRoom, name]);

  const displayCode = game.roomCode || rawCode;

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
