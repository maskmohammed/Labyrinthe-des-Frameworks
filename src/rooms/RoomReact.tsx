// src/rooms/ReactRoom.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import reactBg from "../assets/images/react-bg.png";
import { playSound } from "../utils/sound";
import { useNavigate } from "react-router-dom";

export default function ReactRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  
  const script = [
    "Marhbaaaaaaa ! Bienvenue dans mon univers React ",
    "Prends ton temps, installe-toi, on va bien s’entendre.",
    "Je suis React. Simple, flexible, prévisible.",
    "Je ne t’impose rien. Tu choisis ton router, ton state manager, ton style.",
    "J’adore les composants ! Tout est réutilisable, lisible et organisé.",
    "Comparons juste un instant… ",
    "Angular ? Solide, mais… parfois un peu militaire.",
    "Vue ? Très sympa, mais moins adopté à l’échelle mondiale.",
    "Next.js ? On est de la même famille mais je suis le cœur.",
    "Ce que j’ai que les autres n’ont pas ?",
    "Une communauté gigantesque.",
    "Une écosystème infini.",
    "Des ressources, des libs, des emplois partout.",
    "Et surtout… une façon de penser modulaire et élégante.",
    "Tu peux me mettre dans n’importe quel projet, je m’adapte.",
    "Mais hé, ne me crois pas sur parole.",
    "Viens découvrir plus dans notre présentation ",
    "Parce que toi… tu as trouvé la bonne salle ",
    "Bravo 🎉 Tu peux retourner dans le labyrinthe maintenant."
  ];

  useEffect(() => {
    playSound("enter");
  }, []);

  const next = () => {
    if (step < script.length - 1) setStep(step + 1);
    else navigate("/congrats");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center text-white overflow-hidden"
    >
      {/* ✅ Background */}
      <img
        src={reactBg}
        className="absolute inset-0 w-full h-full object-cover brightness-65"
        alt="React background"
      />

      {/* ✅ Dialogue */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
        className="z-50 bg-black/70 px-6 py-4 rounded-xl text-center max-w-[75%] text-sm shadow-xl backdrop-blur-md leading-relaxed"
      >
        <p>{script[step]}</p>

        <button
          onClick={next}
          className="mt-3 px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded text-xs"
        >
          Continuer
        </button>
      </motion.div>

      {/* ✅ vignette cinematic */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 to-black/60" />
    </motion.div>
  );
}
