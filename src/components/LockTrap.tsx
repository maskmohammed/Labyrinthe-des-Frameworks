import { motion } from "framer-motion";
import { playSound } from "../utils/sound";

type Props = {
  onClose: () => void;
  onLoseKey: () => void;
};

export default function LockTrap({ onClose, onLoseKey }: Props) {
  // ✅ aucune interaction, tu perds automatiquement
  setTimeout(() => {
    playSound("wrong");
    onLoseKey();
    onClose();
  }, 1800);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/90 text-white flex flex-col items-center justify-center z-[999]"
    >
      <p className="text-xl mb-2 animate-pulse">🚨 Piège !</p>

      <p className="text-sm opacity-80 text-center">
        Ce défi est impossible.<br />
        La serrure t'arrache une clé...
      </p>
    </motion.div>
  );
}
