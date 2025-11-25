// src/rooms/AngularRoom.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import angularBg from "../assets/images/angular-bg.png";
import { playSound } from "../utils/sound";
import { useNavigate } from "react-router-dom";

export default function AngularRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const script = [
    "Akhi... t’es sérieux ? On vient de finir la présentation d’Angular.",
    "Et toi tu arrives maintenant ?",
    "Qu’est-ce que tu fais ici exactement ?",
    "Je suis Angular.",
    "Je suis structuré, stable et Enterprise-ready.",
    "Tu veux des apps gigantesques, maintenables 7 ans ? C’est moi.",
    "TypeScript n’est pas un bonus, c’est ma colonne vertébrale.",
    "J’ai un router, un form system, un HTTP client… intégrés dès le départ.",
    "Pendant que les autres installent 14 libraries, moi je suis déjà en production.",
    "Mais bon… apparemment t’as raté tout ça.",
    "Dommage pour toi…",
    "Mais pas grave.",
    "Pour comprendre pourquoi je suis choisi par les grandes boîtes…",
    "Rejoins notre présentation très bientôt.",
    "Allez, retourne dans le labyrinthe."
  ];

  useEffect(() => {
    playSound("enter");
  }, []);

  const next = () => {
    if (step === 0 || step === 1) playSound("jalal");
    else playSound("click");

    if (step < script.length - 1) setStep(step + 1);
    else navigate("/map");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 w-full h-full text-white flex items-center justify-center overflow-hidden"
    >
      {/* ✅ Background */}
      <img
        src={angularBg}
        className="absolute inset-0 w-full h-full object-cover brightness-65"
        alt="Angular background"
      />

      {/* ✅ Dialogue */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
        className="z-50 bg-black/70 px-6 py-4 rounded-xl text-center max-w-[70%] text-sm leading-relaxed shadow-lg backdrop-blur-md"
      >
        <p>{script[step]}</p>

        <button
          onClick={next}
          className="mt-3 px-4 py-1 bg-red-500 hover:bg-red-600 rounded text-xs"
        >
          Continuer
        </button>
      </motion.div>

      {/* ✅ dark vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 to-black/60" />
    </motion.div>
  );
}
