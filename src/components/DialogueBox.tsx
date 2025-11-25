// src/components/DialogueBox.tsx
import { useEffect, useState } from "react";

type Props = {
  messages: string[];
  onClose: () => void;
  avatar?: string; // emoji/icons
};

export default function DialogueBox({ messages, onClose, avatar }: Props) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  // typewriter effect
  useEffect(() => {
    const full = messages[index];
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [index, messages]);

  const next = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
      setDisplayed("");
    } else {
      onClose();
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black/80 text-white p-4 rounded-xl shadow-xl border border-white/20">
      <div className="flex items-center gap-3">
        {avatar && (
          <div className="text-3xl">
            {avatar}
          </div>
        )}

        <p className="text-sm leading-relaxed">{displayed}</p>
      </div>

      <button
        onClick={next}
        className="mt-3 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded"
      >
        Continuer
      </button>
    </div>
  );
}
