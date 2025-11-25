// src/minigames/WikaliloGate.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/sound";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const OPTIONS = [
  "J'ai insulté PHP",
  "J'ai volé un cookie HTTP",
  "J'ai présenté avec Yahya Javascript",
  "J'ai dit que j'utilise jQuery en 2025", // ✅ correct
];

export default function WikaliloGate({ onClose, onSuccess }: Props) {
  const [pick, setPick] = useState<string | null>(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!pick) return setError("Choisis une réponse.");

    if (pick !== "J'ai présenté avec Yahya Javascript") {
      playSound("wrong");
      return setError("100% Faux.");
    }

    playSound("welcome");
    onSuccess();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/85 text-white flex flex-col items-center justify-center z-[999]"
    >
      <p className="mb-4 text-sm opacity-90 text-center">
        🚔 Pourquoi es-tu en prison ?
      </p>

      <div className="grid grid-cols-1 gap-2 w-72">
        {OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => { setPick(opt); setError(""); }}
            className={`py-2 rounded text-xs border ${
              pick === opt ? "bg-purple-600" : "bg-white/15"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      <button onClick={validate} className="mt-4 bg-green-500 px-4 py-1 rounded text-sm">
        Valider
      </button>

      <button onClick={onClose} className="mt-2 text-xs opacity-70 hover:opacity-100">
        Quitter
      </button>
    </motion.div>
  );
}
