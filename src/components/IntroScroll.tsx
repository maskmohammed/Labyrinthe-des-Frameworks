// src/components/IntroScroll.tsx
import { motion } from "framer-motion";
import tmerguin from "../assets/images/tmrgin.png";

export default function IntroScroll({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="absolute inset-0 bg-black text-yellow-300 flex items-end justify-center overflow-hidden z-[9999]">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "-260%" }}
        transition={{ duration: 60, ease: "linear" }}
        className="text-center text-xl leading-relaxed w-[70%] font-serif"
        onAnimationComplete={onFinish}
      >

        <p className="mb-6">Dans une licence informatique lointaine...</p>

        <p className="mb-6">
          Un étudiant nommé Kidar voulait choisir sa voie dans le développement web.
        </p>

        <p className="mb-6">
          Pour y arriver, il devait traverser un labyrinthe géant créé par un prof de JEE M. A E
          qui voulait tester son courage et son esprit critique.
        </p>

        <p className="mb-6">
          Chaque salle cachait un framework. Chaque choix influençait la sortie.
        </p>

        <p className="mb-6">
          Angular bloquait le chemin avec ses modules. Vue attendait dans le calme.
          Next préparait ses pages. React observait tout depuis la dernière salle.
        </p>

        <p className="mb-6">
          Kidar devait comprendre leurs forces, leurs limites, et trouver celui qui lui
          correspondait vraiment. C’était la seule façon de sortir du labyrinthe.
        </p>

        <p className="mb-6">
          Le défi commençait maintenant. Pas de retour en arrière.
        </p>

        <p className="mb-10 font-bold text-2xl">
          Kidar inspira profondément. Puis fit son premier pas.
        </p>

        {/* Final easter egg image */}
        <div className="flex justify-center mt-16">
          <img
            src={tmerguin}
            alt="Tmerguin"
            className="w-40 opacity-90 mx-auto rounded-lg"
          />
        </div>

        <p className="mt-10 text-sm opacity-70">Appuyez sur Entrée pour sauter</p>
      </motion.div>
    </div>
  );
}
