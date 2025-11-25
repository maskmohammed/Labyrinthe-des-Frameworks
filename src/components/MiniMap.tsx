// src/components/MiniMap.tsx
import { TILE_SIZE, mapLayout } from "../map/mapData";
import { ROOMS } from "../map/rooms";

type Props = {
  playerPos: { x: number; y: number };
};

export default function MiniMap({ playerPos }: Props) {
  const SCALE = 0.2; // minimap size ratio

  const tileSize = TILE_SIZE * SCALE;

  return (
    <div
      className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-md"
      style={{ zIndex: 999 }}
    >
      {mapLayout.map((row, y) => (
        <div key={y} className="flex">
          {row.map((tile, x) => {
            const isRoom = ROOMS.some(r => r.x === x && r.y === y);
            const isPlayer =
              Math.floor(playerPos.x / TILE_SIZE) === x &&
              Math.floor(playerPos.y / TILE_SIZE) === y;

            return (
              <div
                key={x}
                style={{
                  width: tileSize,
                  height: tileSize,
                  background: isPlayer
                    ? "#4ade80" // player
                    : isRoom
                    ? "#60a5fa" // room
                    : tile === "wall"
                    ? "#1f2937" // dark
                    : "#9ca3af", // floor
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
