"use client";

import type { Character } from "@/types/game";

interface CharacterCardProps {
  character: Character;
  isCrossedOut: boolean;
  onToggle: () => void;
  isSecret?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function CharacterCard({
  character,
  isCrossedOut,
  onToggle,
  isSecret = false,
  isSelectable = false,
  isSelected = false,
  onSelect,
}: CharacterCardProps) {
  const handleClick = () => {
    if (isSelectable && onSelect) {
      onSelect();
    } else {
      onToggle();
    }
  };

  return (
    <div
      className={`character-card ${isCrossedOut ? "crossed-out" : ""}`}
      onClick={handleClick}
      style={{
        ...(isSecret
          ? {
              borderColor: "hsl(220, 83%, 58%)",
              boxShadow: "0 0 15px hsla(220, 83%, 58%, 0.3)",
            }
          : {}),
        ...(isSelected
          ? {
              borderColor: "hsl(142, 71%, 45%)",
              boxShadow: "0 0 20px hsla(142, 71%, 45%, 0.4)",
              transform: "scale(1.05)",
            }
          : {}),
      }}
      id={`card-${character.id}`}
    >
      {/* Avatar */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "linear-gradient(135deg, hsl(230, 18%, 22%), hsl(230, 18%, 28%))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "hsl(230, 10%, 40%)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {character.avatar ? (
          <img
            src={character.avatar}
            alt={character.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              // Fallback to initial if image fails
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.style.fontSize = '2.5rem';
              (e.target as HTMLImageElement).parentElement!.textContent = character.name[0];
            }}
          />
        ) : (
          character.name[0]
        )}

        {/* Secret indicator */}
        {isSecret && (
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "hsl(220, 83%, 58%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6rem",
            }}
          >
            ⭐
          </div>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "hsl(142, 71%, 45%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            ✓
          </div>
        )}
      </div>

      {/* Name */}
      <div
        style={{
          padding: "0.2rem 0.5rem",
          fontSize: "0.7rem",
          fontWeight: 600,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {character.name}
      </div>
    </div>
  );
}
