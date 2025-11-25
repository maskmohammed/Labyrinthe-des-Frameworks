// src/rooms/WikaliloRoom.tsx
import { useEffect, useState } from "react";
import prisonImg from "../assets/images/prison.png";
import prisonVid from "../assets/videos/prison.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WikaliloRoom({ setInventory }: { setInventory: any }) {
  const [phase, setPhase] = useState<0 | 1>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 3000);
    return () => clearTimeout(timer);
  }, []);

  const exit = () => {
    setInventory((prev: Set<string>) => new Set(prev).add("wikalilo-key"));
    navigate("/map");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 overflow-hidden bg-black text-white z-[999]"
    >
      {/* ✅ Background prison image */}
      <img
        src={prisonImg}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        alt="Prison"
      />

      {/* ✅ PHASE 1 — suspense */}
      {phase === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold drop-shadow-lg"
          >
            ZMIIIIT… Tu es en PRISON maintenant…
          </motion.p>
        </div>
      )}

      {/* ✅ PHASE 2 — prank video fullscreen */}
      {phase === 1 && (
        <>
          <video
            src={prisonVid}
            autoPlay
            onEnded={exit}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* ✅ message prank en bas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 w-full text-center text-lg font-semibold drop-shadow-lg"
          >
            😈 Relax… c’est juste un prank hhhh
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
