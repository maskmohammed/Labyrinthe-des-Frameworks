// src/minigames/TriggerWordle.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/sound";

const ANSWER = "KIDAR";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function TriggerWordle({ onClose, onSuccess }: Props) {
  const [guess, setGuess] = useState("");
  const [rows, setRows] = useState<string[]>([]);
  const [error, setError] = useState("");

  const submit = () => {
    if (guess.length !== 5) {
      setError("Le mot doit contenir 5 lettres.");
      return;
    }

    const upper = guess.toUpperCase();
    const newRows = [...rows, upper];
    setRows(newRows);

    if (upper === ANSWER) {
      playSound("welcome");
      onSuccess();
      onClose();
      return;
    }

    if (newRows.length >= 6) {
      playSound("wrong");
      setError(`ZMIIIT Faux ! Le mot était ${ANSWER}.`);
      return;
    }

    playSound("wrong");
    setGuess("");
    setError("");
  };

  const getColor = (letter: string, index: number) => {
    if (ANSWER[index] === letter) return "bg-green-500";
    if (ANSWER.includes(letter)) return "bg-yellow-500";
    return "bg-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/90 text-white flex flex-col items-center justify-center z-[999]"
    >
      <h2 className="text-lg font-bold mb-3">Défi du Trigger</h2>
      <p className="text-xs opacity-70 mb-4">Wordle</p>

      {/* GRID */}
      <div className="grid grid-rows-6 gap-2 mb-4">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-1">
            {[...row].map((l, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 flex items-center justify-center font-bold rounded ${getColor(
                  l,
                  idx
                )}`}
              >
                {l}
              </div>
            ))}
          </div>
        ))}

        {/* Current Row */}
        {rows.length < 6 && (
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center font-bold rounded bg-white/10"
              >
                {guess[i] ?? ""}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <input
        autoFocus
        maxLength={5}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        className="text-black px-3 py-1 rounded mb-2 text-center uppercase"
        placeholder="5 lettres"
      />

      {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

      <button
        onClick={submit}
        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm mb-2"
      >
        Valider
      </button>

      <button
        onClick={onClose}
        className="text-xs opacity-70 hover:opacity-100"
      >
        Quitter
      </button>
    </motion.div>
  );
}
