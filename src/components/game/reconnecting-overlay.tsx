"use client";

export default function ReconnectingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10, 10, 20, 0.75)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.3s ease forwards",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          padding: "2.5rem",
          borderRadius: "1rem",
          background: "hsla(230, 21%, 15%, 0.9)",
          border: "1px solid hsla(220, 83%, 68%, 0.2)",
          boxShadow: "0 0 40px hsla(220, 83%, 68%, 0.1)",
        }}
      >
        <div
          style={{
            width: "2.5rem",
            height: "2.5rem",
            border: "3px solid hsla(220, 83%, 68%, 0.2)",
            borderTopColor: "hsl(220, 83%, 68%)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <p
          style={{
            color: "hsl(220, 83%, 68%)",
            fontSize: "1.1rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          Reconnecting…
        </p>
        <p
          style={{
            color: "hsl(230, 10%, 50%)",
            fontSize: "0.85rem",
            textAlign: "center",
            maxWidth: "260px",
            lineHeight: 1.5,
          }}
        >
          Hang tight — your game is safe.
          <br />
          Restoring your session.
        </p>
      </div>
    </div>
  );
}
