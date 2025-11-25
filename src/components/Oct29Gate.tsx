// src/minigames/Oct29Gate.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/sound";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const OPTIONS = [
  { label: "Malongo", correct: false },
  { label: "Chat qui miaule", correct: false },
  { label: "Lame da qui se lève", correct: true }, // ✅ bonne réponse
  { label: "Rire de Hamza", correct: false },
];

export default function Oct29Gate({ onClose, onSuccess }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");

  // 🔊 joue la séquence creepy
  useEffect(() => {
    playSound("wind");
    setTimeout(() => playSound("door2"), 900);
    setTimeout(() => playSound("ghost"), 1800);
  }, []);

  const validate = () => {
    if (!selected) {
      setError("Choisis une réponse.");
      return;
    }

    const ok = OPTIONS.find(o => o.label === selected)?.correct;

    if (!ok) {
      playSound("wrong");
      setError("100% Faux... essaie encore.");
      return;
    }

    playSound("welcome");
    onSuccess();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/90 text-white flex flex-col items-center justify-center z-[999]"
    >
      <p className="mb-4 text-center text-sm opacity-80">
        Écoute bien la séquence...
        <br />
        Quel son vient ensuite ?
      </p>

      <div className="grid grid-cols-1 gap-2 w-64">
        {OPTIONS.map((o) => (
          <button
            key={o.label}
            onClick={() => {
              setSelected(o.label);
              setError("");
            }}
            className={`py-2 rounded text-sm border 
              ${selected === o.label
                ? "bg-red-500 border-red-300"
                : "bg-white/15 border-white/20"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      <button
        onClick={validate}
        className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 rounded text-sm"
      >
        Valider
      </button>

      <button
        onClick={onClose}
        className="mt-2 text-xs opacity-70 hover:opacity-100"
      >
        Quitter
      </button>
    </motion.div>
  );
}
