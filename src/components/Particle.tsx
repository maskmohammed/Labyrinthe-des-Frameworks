import { motion } from "framer-motion";

export default function Particle({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-white rounded-full opacity-70"
      initial={{ x, y, scale: 1 }}
      animate={{ y: y - 10, opacity: 0, scale: 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}
