// src/components/ZeldaDoorTransition.tsx
import { motion } from "framer-motion";

export default function ZeldaDoorTransition({ active }: { active: boolean }) {

  if (!active) return null;

  return (
    <>
      {/* Left panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-1/2 h-full bg-black z-[9999]"
      />

      {/* Right panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 w-1/2 h-full bg-black z-[9999]"
      />
    </>
  );
}
