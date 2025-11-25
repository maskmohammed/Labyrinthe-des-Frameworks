// src/rooms/Oct29Room.tsx
import { useEffect, useState } from "react";
import jumpscareVid from "../assets/videos/scary.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { playSound } from "../utils/sound";

export default function Oct29Room() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  // ✅ Start countdown when entering room
  useEffect(() => {
    if (phase !== 0) return;

    const interval = setInterval(() => {
      setCount((c) => {
        if (c === 1) {
          clearInterval(interval);
          setPhase(1);
          playSound("explosion"); // 💥 sound effect
          return 1;
        }
        return c - 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [phase]);

  // ✅ After jumpscare video → funny message
  const handleVideoEnd = () => {
    setPhase(2);

    setTimeout(() => {
      setPhase(3);
      navigate("/map"); // ✅ return automatically
    }, 3200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black text-white flex items-center justify-center z-[999]"
    >
      {/* ✅ Phase 0 — Countdown suspense */}
      {phase === 0 && (
        <p className="text-6xl font-bold animate-pulse">{count}</p>
      )}

      {/* ✅ Phase 1 — Fullscreen jumpscare */}
      {phase === 1 && (
        <video
          src={jumpscareVid}
          autoPlay
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* ✅ Phase 2 — Funny reveal */}
      {phase === 2 && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xl font-semibold text-center px-4"
        >
          hhhhhh catastrophe encore évasion… mauvaise salle.
          <br />
          ZMIIIIIIIIIIIIIIIT
        </motion.p>
      )}
    </motion.div>
  );
}
