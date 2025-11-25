// src/pages/Congrats.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kidarIdle from "../assets/images/kidar.png";
import tmergin from "../assets/images/tmrgin.png";

const messages = [
  "Félicitations, KIDAR.",
  "Tu as traversé le labyrinthe.",
  "Tu as écouté chaque framework.",
  "Tu as appris comment chacun pense.",
  "Chaque étudiant vit la même quête. Tu cherches ce qui te correspond, tu compares, tu testes, tu avances.",
  "React t’a choisi. Mais tu sais maintenant ce que pensent Angular, Vue et Next.",
  "La sagesse du jour dit: ",
  "Ne juge jamais une personne ce Kidar n'est pas un vrai Kidar.",
  "Ne juge pas un framework à son logo.",
  " Ne juge pas un code à sa couleur. ",
  "Ne juge pas un Kidar à sa tête.",
  "Et surtout, ne juge jamais un professeur...",
  "...avant de voir son sujet d’examen."
];

export default function Congrats() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0); // index within messages
  const [showFinalText, setShowFinalText] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);

  // timings (en ms)
  const startDelay = 1500; // délai avant que la première phrase apparaisse (synchronisé avec KIDAR/name)
  const displayDuration = 3000; // durée d'affichage de chaque phrase
  const betweenDelay = 300; // petit gap entre exit et entrée suivante
  const finalTextDelay = 700; // délai avant le message "N’oubliez jamais"
  const finalImageDelay = 500; // délai après le final text pour faire apparaître l'image

  // lance la séquence après startDelay
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, []);

  // avance l'index tant que la séquence est démarrée et pas terminée
  useEffect(() => {
    if (!started) return;

    // si on n'est pas encore au dernier message, programmer l'avancement
    if (index < messages.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), displayDuration + betweenDelay);
      return () => clearTimeout(t);
    }

    // si on vient d'afficher le dernier message, programmer le final text + image
    if (index === messages.length - 1) {
      const t1 = setTimeout(() => setShowFinalText(true), displayDuration + betweenDelay + finalTextDelay);
      const t2 = setTimeout(() => setShowFinalImage(true), displayDuration + betweenDelay + finalTextDelay + finalImageDelay);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [started, index]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center text-white p-6"
      style={{
        background: "linear-gradient(180deg, #0a1e3d 0%, #123c72 40%, #0a1e3d 100%)"
      }}
    >
      {/* KIDAR animated drop */}
      <motion.img
        src={kidarIdle}
        alt="Kidar"
        className="w-32 h-32 mb-6"
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Name */}
      <motion.p
        className="text-lg font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        KIDAR
      </motion.p>

      {/* Sequence de messages — un seul visible à la fois, grand et centré */}
      <div className="flex items-center justify-center h-56 mb-6 px-4">
        <AnimatePresence mode="wait">
          {started && (
            <motion.div
              key={index}
              className="max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                {messages[index]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Texte final "N’oubliez jamais" */}
      <AnimatePresence>
        {showFinalText && (
          <motion.p
            className="mt-2 mb-3 text-lg opacity-90 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            N’oubliez jamais
          </motion.p>
        )}
      </AnimatePresence>

      {/* Final Image */}
      <AnimatePresence>
        {showFinalImage && (
          <motion.img
            src={tmergin}
            alt="final wisdom"
            className="w-40 mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
