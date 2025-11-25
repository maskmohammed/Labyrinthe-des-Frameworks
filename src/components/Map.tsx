// src/components/Map.tsx
import { useEffect, useRef } from "react";
import { mapLayout, TILE_SIZE } from "../map/mapData";

type Props = {
  roomRefs: React.MutableRefObject<HTMLDivElement[]>;
};

export default function Map({ roomRefs }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  let roomIndex = 0;

  return (
    <div
      ref={mapRef}
      className="relative"
      style={{
        width: mapLayout[0].length * TILE_SIZE,
        height: mapLayout.length * TILE_SIZE,
      }}
    >
      {mapLayout.map((row, y) =>
        row.map((tile, x) => {
          const isRoom = tile === "room";
          const ref = isRoom
            ? (el: HTMLDivElement | null) => {
                if (el) roomRefs.current[roomIndex++] = el;
              }
            : undefined;

          return (
            <div
              key={`${x}-${y}`}
              ref={ref}
              className="absolute"
              style={{
                left: x * TILE_SIZE,
                top: y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                background:
                  tile === "wall"
                    ? "#333"
                    : tile === "room"
                    ? "#4ade80" // green
                    : "#bbb",
                border:
                  tile === "wall"
                    ? "2px solid #111"
                    : "1px solid rgba(0,0,0,0.1)",
              }}
            />
          );
        })
      )}
    </div>
  );
}
