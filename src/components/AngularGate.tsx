// src/minigames/AngularGate.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/sound";
import { useNavigate } from "react-router-dom";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

const WORDS = [
  "Ivy",
  "Google",
  "Virtual DOM",
  "Fiber",
  "Vuex",
  "Décorateur",
];

const CORRECT = ["Ivy", "Google", "Décorateur"];

export default function AngularGate({ onClose, onSuccess }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toggle = (word: string) => {
    setSelected(prev =>
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word].slice(0, 3)
    );
  };

  const submit = () => {
    if (selected.length < 3) {
        setError("Sélectionne 3 mots.");
        return;
    }

    const ok = selected.every(w => CORRECT.includes(w));

    if (!ok) {
        playSound("wrong");
        setError("Mauvais choix. Angular refuse ton entrée.");
        return;
    }

    playSound("welcome");
    onSuccess(); // ✅ laisser OverworldMap s'occuper de navigate
    onClose();
    };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
      w-[90%] bg-black/85 text-white p-4 rounded-xl border border-white/20">

      <p className="mb-3 text-sm">
        Clue : "Angular"
        <br />
        Trouve les <strong>3 mots corrects</strong>.
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {WORDS.map(word => (
          <button
            key={word}
            onClick={() => toggle(word)}
            className={`px-2 py-1 rounded 
              ${selected.includes(word) ? "bg-red-500" : "bg-white/20"}`}
          >
            {word}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

      <button
        onClick={submit}
        className="w-full bg-green-500 hover:bg-green-600 py-1 rounded text-sm"
      >
        Valider
      </button>
    </div>
  );
}
