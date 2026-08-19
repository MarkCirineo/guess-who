import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt =
  "Guess Who Online — play the classic board game free in your browser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FACES = ["bella", "carlos", "diana", "george", "luna", "marco"];

export default async function Image() {
  const faces = await Promise.all(
    FACES.map(async (id) => {
      const file = await readFile(
        path.join(process.cwd(), "public", "characters", `${id}.png`)
      );
      return `data:image/png;base64,${file.toString("base64")}`;
    })
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #12141f 0%, #16203a 50%, #12141f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 18, marginBottom: 40 }}>
          {faces.map((src, i) => (
            <img
              key={i}
              src={src}
              width={130}
              height={130}
              style={{
                borderRadius: 16,
                border: "3px solid rgba(255,255,255,0.15)",
                transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 3}deg)`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          Guess Who Online
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 14,
            color: "#9aa3c0",
            display: "flex",
          }}
        >
          The classic board game — free in your browser, no sign-up
        </div>
      </div>
    ),
    { ...size }
  );
}
