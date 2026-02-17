// src/pages/Home.tsx
import { motion } from "framer-motion";
import kidar from "../assets/images/kidar.png";
import groupLogo from "../assets/images/tmrgin.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IntroScroll from "./IntroScroll";
import bg from "../assets/images/bg-game.png";

export default function Home() {
    const [startIntro, setStartIntro] = useState(false);
    const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center text-white relative"
      style={{
        backgroundImage:  `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-wide kidar-font"
      >
        Bienvenue dans le Labyrinthe
      </motion.h1>

     
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-sm opacity-80 mt-1 kidar-font"
      >
        Explore, compare, choisis ton framework.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center mt-10"
      >
        <span className="mb-1 text-sm bg-black/50 px-2 py-[2px] rounded">
          KIDAR
        </span>

        <motion.img
          src={kidar}
          alt="KIDAR"
          className="w-32 h-32 image-pixelated"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.3 }}
        />
      </motion.div>

      <motion.button
        onClick={() => setStartIntro(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="kidar-font mt-10 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-sm font-bold shadow-lg border border-yellow-300 hover:scale-105 transition-transform"
      >
        Commencer le Labyrinthe
      </motion.button>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 text-lg">
        <img src={groupLogo} alt="Groupe 3" className="w-42 h-28 rounded" />
        <span>Projet réalisé par le Groupe 3</span>
      </div>

      {startIntro && (
      <IntroScroll
        onFinish={() => {
          navigate("/map");
        }}
      />
    )}
    </div>
  );
}

