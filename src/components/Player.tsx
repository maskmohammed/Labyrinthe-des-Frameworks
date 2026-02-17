
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { isWall, mapLayout, TILE_SIZE } from "../map/mapData";
import { useNavigate } from "react-router-dom";
import { playSound } from "../utils/sound";
import Particle from "./Particle";
// import kidarSprite from "../assets/kidar/kidar_walk.png";
import rightone from "../assets/sprites/kidar/right_walk_1.png";
import rightIdle from "../assets/sprites/kidar/right_idle.png";
import righttwo from "../assets/sprites/kidar/right_walk_2.png";

import leftone from "../assets/sprites/kidar/down_walk_1.png";
import leftIdle from "../assets/sprites/kidar/down_idle.png";
import lefttwo from "../assets/sprites/kidar/down_walk_2.png";

import upone from "../assets/sprites/kidar/up_walk_1.png";
import upIdle from "../assets/sprites/kidar/up_idle.png";
import uptwo from "../assets/sprites/kidar/up_walk_2.png";

type Room = { 
  id: string; 
  label: string; 
  color: string; 
  path: string; 
  avatar?: string;
  messages?: string[];
  requiresKey?: string; 
  x: number;   
  y: number;   
};

type Props = {
  rooms: Room[];
  roomRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  setDialogue: (msg: string[] | null) => void;
  setDialogueAvatar: (a: string | null) => void;
  setCurrentRoomId: (id: string | null) => void;
  onPlayerMove: (pos: { x: number; y: number }) => void;
  completedRooms: Set<string>;
  inventory: Set<string>;                      
  setInventory: React.Dispatch<React.SetStateAction<Set<string>>>; 
};

const SPRITES = {
  down: [upone, upone, upone],
  left: [leftone, leftIdle, lefttwo],
  up: [upIdle, uptwo, upIdle],
};

export default function Player({
  rooms,
  roomRefs,
  setDialogue,
  setCurrentRoomId,
  setDialogueAvatar,
  onPlayerMove,
  completedRooms,
  inventory,           
  setInventory
}: Props) {
  const GRID = TILE_SIZE;
  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [frame, setFrame] = useState(0);

  const FRAME_SIZE = 48;
  const PLAYER_SIZE = FRAME_SIZE;

  const [pos, setPos] = useState({
    x: 2 * GRID,
    y: 2 * GRID,
  });

  const lastPos = useRef(pos);
  const [dir, setDir] = useState<"up" | "down" | "left" | "right">("down");
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const moving =
      lastPos.current.x !== pos.x || lastPos.current.y !== pos.y;

    if (!moving) return setFrame(1);

    const interval = setInterval(
      () => setFrame((f) => (f === 2 ? 0 : f + 1)),
      160 
    );

    return () => clearInterval(interval);
  }, [pos]);


  // --------------------------------------------------------------------------------
  // 1. MOVEMENT
  // --------------------------------------------------------------------------------
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      setPos((prev) => {
        let next = prev;
        let moved = false;

        if (e.key === "ArrowUp") {
          setDir("up");
          next = { x: prev.x, y: prev.y - GRID };
          moved = true;
        }
        if (e.key === "ArrowDown") {
          setDir("down");
          next = { x: prev.x, y: prev.y + GRID };
          moved = true;
        }
        if (e.key === "ArrowLeft") {
          setDir("left");
          next = { x: prev.x - GRID, y: prev.y };
          moved = true;
        }
        if (e.key === "ArrowRight") {
          setDir("right");
          next = { x: prev.x + GRID, y: prev.y };
          moved = true;
        }

        if (!moved) return prev;

        const cx = next.x + GRID / 2;
        const cy = next.y + GRID / 2;
        if (isWall(cx, cy)) {
          controls.start({
            x: [0, -4, 4, -2, 2, 0],
            transition: { duration: 0.15 },
          });

          playSound("bump");
          window.dispatchEvent(new CustomEvent("player-hit-wall"));
          return prev;
        }

        playSound("step");

        onPlayerMove(next);
        setParticles(p => [...p, { x: next.x, y: next.y }].slice(-8));
        return next;
      });
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  // --------------------------------------------------------------------------------
  // 2. SQUASH ANIMATION
  // --------------------------------------------------------------------------------
  useEffect(() => {
    const moving = lastPos.current.x !== pos.x || lastPos.current.y !== pos.y;

    if (moving) {
      controls
        .start({
          scaleX: 1.15,
          scaleY: 0.85,
          rotate: dir === "left" ? -8 : dir === "right" ? 8 : 0,
          transition: { duration: 0.08 },
        })
        .then(() =>
          controls.start({
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
            transition: { duration: 0.25 },
          })
        );
    }

    lastPos.current = pos;
  }, [pos, controls, dir]);

  // --------------------------------------------------------------------------------
  // 3. SNAP TO GRID
  // --------------------------------------------------------------------------------
  useEffect(() => {
    setPos((prev) => ({
      x: Math.round(prev.x / GRID) * GRID,
      y: Math.round(prev.y / GRID) * GRID,
    }));
  }, []);

  // --------------------------------------------------------------------------------
  // 4. ROOM COLLISION + MESSAGES
  // --------------------------------------------------------------------------------
  useEffect(() => {
    const cx = pos.x + GRID / 2;
    const cy = pos.y + GRID / 2;

    const tileX = Math.floor(cx / GRID);
    const tileY = Math.floor(cy / GRID);

    const tile = mapLayout[tileY]?.[tileX];

    if (tile === "lock") {
      if (inventory.size > 0) {
        playSound("locked");
        window.dispatchEvent(new CustomEvent("lock-trap"));
        setPos(lastPos.current);
      } else {
        playSound("bump");
      }
      return;
    }

    if (tile === "trigger") {
      if (!inventory.has("universal-key")) {
        playSound("mystery");
        window.dispatchEvent(
          new CustomEvent("challenge-start", { detail: "trigger" })
        );
        setPos(lastPos.current); 
      } else {
        setDialogue(["✨ Tu sens encore une énergie étrange..."]);
        setDialogueAvatar("✨");
      }
      return;
    }

    const r = rooms.find(room => room.x === tileX && room.y === tileY);

    if (!r) {
      setCurrentRoomId(null);
      setDialogue(null);
      setDialogueAvatar(null);
      return;
    }

    if (r.requiresKey && !inventory.has(r.requiresKey)) {
      playSound("locked");
      window.dispatchEvent(new CustomEvent("challenge-start", { detail: r.id }));
      setPos(lastPos.current); 
      return;
    }

    setCurrentRoomId(r.id);
    setDialogue(r.messages ?? []);
    setDialogueAvatar(r.avatar ?? null);
    playSound("enter");
    window.dispatchEvent(new CustomEvent("room-enter"));
    playSound("door");
    navigate(r.path);
  }, [pos]);

  // --------------------------------------------------------------------------------
  // 5. RENDER
  // --------------------------------------------------------------------------------
  return (
    <motion.div
      ref={ref}
      className="absolute z-50"
      animate={{
        x: pos.x + (GRID - PLAYER_SIZE) / 2,
        y: pos.y + (GRID - PLAYER_SIZE) / 2,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      style={{
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      }}
    >
      
      {particles.map((p, i) => (
        <Particle key={i} x={p.x} y={p.y} />
      ))}

      <img
        src={
          dir === "right"
            ? SPRITES.left[frame] 
            : SPRITES[dir][frame]
        }
        alt="Kidar"
        width={FRAME_SIZE}
        height={FRAME_SIZE}
        style={{
          imageRendering: "pixelated",
          transform: dir === "right" ? "scaleX(-1)" : "none",
        }}
      />
    </motion.div>
  );
}
