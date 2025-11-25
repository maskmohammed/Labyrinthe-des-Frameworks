// src/rooms/VueRoom.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import vueBg from "../assets/images/vue-bg.png";
import { playSound } from "../utils/sound";
import { useNavigate } from "react-router-dom";

export default function VueRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const script = [
    "Wewe… bienvenue à moi !",
    "Je suis Vue, enchantée ",
    "Ici, pas de stress, pas de prise de tête.",
    "Je préfère la simplicité et la douceur.",
    "J’ai tout ce qu’il faut pour créer vite, proprement et avec plaisir.",
    "Tu veux des composants ? Je t’en fais en 2 lignes.",
    "Tu veux apprendre un framework sans souffrir ? Je suis littéralement faite pour toi.",
    "Svelte et React me regardent de loin , mais moi je reste chill.",
    "Mais bon… je ne vais pas trop spoiler.",
    "Pour découvrir mes vraies forces…",
    "Rejoins notre présentation très bientôt ",
    "Allez, retourne explorer le labyrinthe."
  ];

  // ✅ son d’entrée dans la salle
  useEffect(() => {
    playSound("enter");
  }, []);

  const next = () => {
    // ✅ joue un son spécial quand ton ami parle
    if (step === 8) playSound("mouad");
    else playSound("click");

    if (step < script.length - 1) setStep(step + 1);
    else navigate("/map"); // ✅ sortie de la salle
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 w-full h-full text-white flex items-center justify-center overflow-hidden"
    >
      {/* ✅ Background */}
      <img
        src={vueBg}
        className="absolute inset-0 w-full h-full object-cover brightness-70"
        alt="Vue background"
      />

      {/* ✅ Dialogue box */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="z-50 bg-black/65 px-6 py-4 rounded-xl text-center max-w-[70%] text-sm leading-relaxed shadow-lg backdrop-blur-md"
      >
        <p>{script[step]}</p>

        <button
          onClick={next}
          className="mt-3 px-4 py-1 bg-green-500 hover:bg-green-600 rounded text-xs"
        >
          Continuer
        </button>
      </motion.div>

      {/* ✅ Soft vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 to-black/50" />
    </motion.div>
  );
}
