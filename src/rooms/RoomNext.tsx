import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import bg from "../assets/images/next_background.png";
import { playSound } from "../utils/sound";


export default function NextRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const script = [
    [
      "⚡ Oh, salut voyageur du web.",
      "Bienvenue dans mon domaine… Next.js.",
    ],
    [
      "Je suis React, mais évolué.",
      "Rapide, structuré, optimisé pour le monde réel."
    ],
    [
      "Je pense en pages, en routes, en données…",
      "et je te livre tout avant même que tu le demandes."
    ],
    [
      "Performance, SEO, server-side rendering, streaming…",
      "C’est mon quotidien."
    ],
    [
      "Pourquoi me choisir ?",
      "Parce que je construis des applications sérieuses, prêtes à scaler."
    ],
    [
      "Mais je ne suis qu’une partie de l’histoire.",
      "Pour en savoir plus, viens à notre présentation très bientôt "
    ],
    [
      "Merci de ton passage.",
      "Le labyrinthe t’attend à nouveau."
    ]
  ];

  const next = () => {
    // 👉 déclenche le son juste avant la présentation
    if (step === 4) {
      playSound("hamza"); // nom de ton fichier audio
    }

    if (step < script.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/map");
    }
  };

  return (
    <div
      className="absolute inset-0 bg-black flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DialogueBox
        messages={script[step]}
        avatar="Next.js"
        onClose={next}
      />
    </div>
  );
}
