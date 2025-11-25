// src/map/rooms.ts

export type RoomDef = {
  id: string;
  label: string;
  color: string;
  path: string;
  x: number;   // tile X
  y: number;   // tile Y
  message: string;
  avatar: string;
  messages: string[];
  requiresKey?: string;
  challenge: string;
};


export const ROOMS: RoomDef[] = [
  {
    id: "react",
    label: "React",
    color: "bg-blue-500",
    path: "/react",
    x: 24,  
    y: 1,
    message: "done",
    avatar: "⚛️",
    messages: [
      "Bienvenue dans la salle React.",
      "React est un framework basé sur les composants.",
      "Prépare-toi pour ton premier mini-challenge !"
    ],
    requiresKey: "universal-key",
    challenge: "react-memory"
  },
  {
    id: "angular",
    label: "Angular",
    color: "bg-red-500",
    path: "/angular",
    x: 8,
    y: 1,
    message: "done",
    avatar: "🅰️",
    messages: [
      "Ici c'est Angular.",
      "Un framework puissant, structuré, strict.",
      "Bonne chance pour ce qui t'attend !"
    ],
    requiresKey: "universal-key",
    challenge: "react-memory"
  },
  {
    id: "vue",
    label: "Vue",
    color: "bg-green-500",
    path: "/vue",
    x: 12,
    y: 17,
    message: "done",
    avatar: "🟢",
    messages: [
      "La salle Vue est douce et flexible.",
      "Vue aime la simplicité et l'efficacité.",
      "Amuse-toi bien !"
    ],
    requiresKey: "universal-key",
    challenge: "react-memory"
  },
  {
    id: "next",
    label: "Next.js",
    color: "bg-gray-700",
    path: "/next",
    x: 22,
    y: 21,
    message: "done",
    avatar: "⚡",
    messages: [
      "Bienvenue dans Next.js.",
      "Le royaume du SSR et des pages rapides.",
      "Prépare-toi pour un défi plus avancé !"
    ],
    requiresKey: "universal-key",
    challenge: "react-memory"
  },
  {
  id: "wikalilo",
  label: "Wikalilo",
  color: "bg-purple-600",
  path: "/room1",
  x: 12,
  y: 7,
  avatar: "🪤",
  message: "done",
  messages: [],
  requiresKey: "universal-key",
  challenge: "react-memory"
},
{
  id: "29",
  label: "29/10",
  color: "bg-purple-700",
  path: "/room2",
  x: 4, y: 17, 
  avatar: "👻",
  message: "done",
  messages: ["Cette salle met mal à l’aise...", "Tu es sûr de vouloir entrer ?"],
  requiresKey: "universal-key",
  challenge: "react-memory"
}
];
