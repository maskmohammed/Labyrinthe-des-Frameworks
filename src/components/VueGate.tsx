// src/minigames/VueGate.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/sound";
import { useNavigate } from "react-router-dom";
import liberty from "../assets/images/tmerguin.png";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const OPTIONS = [
  "Laughing Liberty",
  "Statue du Rire",
  "Lady 😂",
  "Tmerguin w Tmerkin", // ✅ correct
];

export default function VueGate({ onClose, onSuccess }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!selected) {
      setError("Choisis une réponse.");
      return;
    }

    if (selected !== "Tmerguin w Tmerkin") {
      playSound("wrong");
      setError("Faux ! Essaie encore.");
      return;
    }

    playSound("welcome");
    onSuccess();
    onClose();
    navigate("/vue");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/90 text-white flex flex-col items-center justify-center z-[999]"
    >
      {/* Image */}
      <img
        src={liberty}
        alt="Vue Challenge"
        className="w-64 mb-6 rounded-lg shadow-lg"
      />

      <p className="text-center mb-4 text-sm opacity-90">
        Devine ce que représente cette image.
      </p>

      {/* Choices */}
      <div className="grid grid-cols-1 gap-2 w-64">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              setSelected(opt);
              setError("");
            }}
            className={`py-2 rounded text-sm border 
              ${
                selected === opt
                  ? "bg-green-500 border-green-300"
                  : "bg-white/15 border-white/20"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      <button
        onClick={validate}
        className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm"
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
