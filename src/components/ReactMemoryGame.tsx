import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  onWin: () => void;
  onClose: () => void;
};

const ICONS = ["⚛️", "🧩", "🎛️"];

export default function ReactMemoryGame({ onWin, onClose }: Props) {
  // duplicate + shuffle
  const shuffled = [...ICONS, ...ICONS]
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({ id: index, value }));

  const [cards, setCards] = useState(shuffled);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const flipCard = (id: number) => {
    if (disabled) return;
    if (flipped.includes(id) || matched.includes(id)) return;

    setFlipped(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;

    setDisabled(true);

    const [a, b] = flipped;
    if (cards[a].value === cards[b].value) {
      setMatched(prev => [...prev, a, b]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 700);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length) {
      setTimeout(() => {
        onWin();
      }, 600);
    }
  }, [matched, cards.length, onWin]);

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-[999]">
      <p className="mb-3 text-lg font-semibold">🧠 Mini-jeu React — Trouve les paires</p>

      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => {
          const reveal = flipped.includes(card.id) || matched.includes(card.id);

          return (
            <motion.button
              key={card.id}
              onClick={() => flipCard(card.id)}
              className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl"
              animate={{ rotateY: reveal ? 180 : 0 }}
              transition={{ duration: 0.35 }}
            >
              {reveal ? card.value : "❓"}
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={onClose}
        className="mt-4 text-sm px-3 py-1 bg-red-500 rounded"
      >
        Quitter
      </button>
    </div>
  );
}
