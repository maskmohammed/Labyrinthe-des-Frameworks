// src/map/mapData.ts

export type Tile = 
  "wall"
  | "grass"
  | "floor"
  | "water"
  | "stone"
  | "room"
  | "trigger"
  | "lock"
  | "tree"
  | "rock"
  | "flower";


export const TILE_SIZE = 32;

// petite map maintenant, grande plus tard
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 15;

// 0 = floor, 1 = wall
// Simple layout, on agrandira après
export const mapLayout: Tile[][] = [
["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
["wall","grass","grass","grass","grass","grass","grass","wall","room","wall","grass","grass","grass","grass","grass","wall","wall","wall","grass","grass","grass","grass","grass","grass","room"],
["wall","grass","grass","wall","wall","wall","grass","wall","grass","wall","grass","wall","wall","wall","grass","wall","grass","wall","grass","wall","wall","wall","grass","grass","wall"],
["wall","grass","wall","grass","grass","wall","grass","wall","grass","wall","grass","grass","grass","wall","grass","wall","grass","wall","grass","grass","grass","wall","grass","wall","wall"],
["wall","grass","wall","grass","wall","wall","grass","wall","grass","wall","wall","wall","grass","wall","grass","wall","grass","wall","wall","wall","grass","wall","grass","grass","wall"],
["wall","grass","grass","grass","wall","grass","grass","wall","grass","grass","grass","wall","grass","grass","grass","wall","grass","grass","grass","wall","grass","wall","wall","grass","wall"],
["wall","wall","wall","grass","wall","grass","wall","wall","wall","wall","grass","wall","wall","wall","grass","wall","wall","wall","grass","wall","grass","grass","grass","grass","wall"],
["wall","trigger","grass","grass","wall","grass","grass","grass","grass","wall","grass","grass","room","wall","grass","wall","grass","grass","grass","wall","wall","wall","grass","wall","wall"],
["wall","wall","wall","grass","wall","wall","wall","wall","grass","wall","wall","grass","wall","wall","grass","wall","grass","wall","grass","grass","grass","wall","grass","wall","wall"],
["wall","grass","grass","grass","grass","grass","grass","wall","grass","grass","grass","grass","grass","wall","grass","wall","grass","wall","wall","wall","grass","wall","grass","grass","wall"],
["wall","grass","wall","wall","wall","wall","grass","wall","wall","wall","wall","wall","grass","wall","grass","wall","grass","grass","grass","wall","grass","wall","wall","grass","wall"],
["wall","grass","wall","grass","grass","grass","grass","grass","grass","grass","grass","wall","grass","grass","grass","wall","grass","wall","grass","wall","grass","grass","grass","grass","wall"],
["wall","grass","wall","wall","wall","wall","wall","wall","wall","wall","grass","wall","grass","wall","grass","wall","grass","wall","grass","wall","wall","wall","wall","grass","wall"],
["wall","grass","grass","grass","grass","grass","grass","wall","grass","grass","grass","wall","grass","wall","grass","grass","grass","wall","grass","grass","grass","grass","wall","grass","wall"],
["wall","wall","wall","grass","wall","wall","grass","wall","grass","wall","wall","wall","grass","wall","grass","wall","wall","wall","wall","wall","wall","grass","wall","grass","wall"],
["wall","grass","grass","grass","grass","wall","grass","wall","grass","grass","grass","grass","grass","wall","grass","grass","grass","grass","grass","grass","grass","grass","wall","grass","wall"],
["wall","grass","wall","wall","grass","wall","grass","wall","wall","wall","wall","wall","grass","wall","wall","wall","wall","wall","wall","wall","wall","grass","wall","grass","wall"],
["wall","grass","grass","wall","room","grass","grass","grass","grass","grass","grass","wall","room","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall"],
["wall","wall","grass","wall","wall","wall","wall","wall","wall","wall","grass","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","grass","wall"],
["wall","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall"],
["wall","grass","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","grass","wall"],
["wall","lock","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","room","grass","wall"],
["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
];


export function isWall(x: number, y: number): boolean {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);

  if (
    tileY < 0 ||
    tileY >= mapLayout.length ||
    tileX < 0 ||
    tileX >= mapLayout[0].length
  ) {
    return true; // hors map = bloqué
  }

  return mapLayout[tileY][tileX] === "wall";
}
