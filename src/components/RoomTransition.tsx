// src/components/RoomTransition.tsx
import { motion } from "framer-motion";

export default function RoomTransition({ active, color }: { active: boolean, color: string }) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-[999] pointer-events-none"
      style={{
        backgroundColor: color,
      }}
    />
  );
}
