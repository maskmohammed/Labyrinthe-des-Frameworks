export const CHALLENGES = {
  trigger: {
    id: "trigger-wordle",
    type: "wordle",
    word: "KIDAR",
    attempts: 5,
    reward: { key: 1 },
    messages: [
      "Une force mystérieuse t’interpelle...",
      "Résous ce Wordle pour obtenir une clé !"
    ],
    avatar: "✨"
  },

  lock: {
    id: "lock-curse",
    type: "impossible-quiz",
    questions: [
      {
        q: "Combien de hooks React possède Angular ?",
        answers: ["42", "infinity", "oui"],
        correct: -1 // impossible
      }
    ],
    failMessage: [
      "💀 Mauvaise réponse...",
      "La salle te vole une clé..."
    ],
    reward: { key: -1 },
    avatar: "🔒"
  },

  rooms: {
    react: {
      id: "react",
      type: "emoji-memory",
      size: 6,
      reward: { key: 1 },
      messages: [
        "Bienvenue dans le royaume de React ⚛️",
        "Associe les composants correctement !"
      ],
      avatar: "⚛️"
    },

    angular: {
      id: "angular",
      type: "rage-quiz",
      questions: [
        {
          q: "Combien de fichiers faut-il pour créer un composant Angular ?",
          answers: ["1", "2", "3", "42"],
          correct: 3
        }
      ],
      reward: { key: 1 },
      messages: ["Angular t’examine sévèrement..."],
      avatar: "🅰️"
    },

    vue: {
      id: "vue",
      type: "reaction-time",
      speed: "fast",
      reward: { key: 1 },
      messages: ["Clique dès que Vue te le dit 👀"],
      avatar: "💚"
    },

    next: {
      id: "next",
      type: "routing-maze",
      reward: { key: 1 },
      messages: ["Trouve la bonne route pour sortir ➡️"],
      avatar: "⬛"
    }
  },

  fakeRooms: {
    wikalilo: {
      id: "wikalilo",
      type: "troll-mcq",
      questions: [
        {
          q: "PHP est-il l’avenir du web ?",
          answers: ["Oui ✅", "Oui ✅✅", "Oui ✅✅✅"],
          correct: 0
        }
      ],
      reward: { key: 1 },
      enterCutscene: {
        message: [
          "😈 Tu voulais du React ?",
          "Bienvenue dans ta nouvelle carrière… en PHP.",
          "Bon courage."
        ],
        video: "/videos/prison.mp4"
      },
      exitMessage: ["😂 Relax, c'était un prank.", "Tiens… une clé."]
    },

    "29-10": {
      id: "29-10",
      type: "countdown-bomb",
      reward: { key: 1 },
      enterCutscene: {
        countdown: true,
        video: "/videos/jumpscare.mp4"
      },
      message: [
        "🤣 Oops… mauvaise salle.",
        "Désolé bro, juste pour le contenu."
      ]
    }
  }
};
