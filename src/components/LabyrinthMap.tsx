// src/components/LabyrinthMap.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Player from "./Player";

type Room = { id: string; label: string; color: string; path: string };

const rooms: Room[] = [
  { id: "react", label: "React", color: "bg-blue-500", path: "/react" },
  { id: "angular", label: "Angular", color: "bg-red-500", path: "/angular" },
  { id: "vue", label: "Vue", color: "bg-green-500", path: "/vue" },
  { id: "next", label: "Next.js", color: "bg-gray-700", path: "/next" },
];

// export default function LabyrinthMap() {
//   const navigate = useNavigate();
//   const roomRefs = useRef<HTMLDivElement[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [lines, setLines] = useState<{ x1:number;y1:number;x2:number;y2:number }[]>([]);

//   // compute lines between room centers after render
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const coords = roomRefs.current.map(r => {
//       if (!r) return null;
//       const rect = r.getBoundingClientRect();
//       const parentRect = containerRef.current!.getBoundingClientRect();
//       return {
//         cx: rect.left + rect.width / 2 - parentRect.left,
//         cy: rect.top + rect.height / 2 - parentRect.top
//       };
//     });

//     const valid = coords.every(c => c !== null);
//     if (!valid) return;

//     // simple connections: chain rooms in array order
//     const newLines: any[] = [];
//     for (let i = 0; i < coords.length - 1; i++) {
//       const a = coords[i]!;
//       const b = coords[i+1]!;
//       newLines.push({ x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy });
//     }
//     setLines(newLines);
//   }, []);

//   return (
//     <div ref={containerRef} className="relative flex flex-col items-center gap-6 p-10 text-white min-h-screen">
//       <motion.h1 className="text-3xl font-bold" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale:1, opacity:1 }} transition={{ duration: 0.6 }}>
//         Labyrinth Map
//       </motion.h1>

//       <Player rooms={rooms} roomRefs={roomRefs} />

//       {/* svg overlay for animated connectors */}
//       <svg className="absolute inset-0 pointer-events-none" preserveAspectRatio="none">
//         {lines.map((l, i) => (
//           <motion.line
//             key={i}
//             x1={l.x1}
//             y1={l.y1}
//             x2={l.x2}
//             y2={l.y2}
//             stroke="#ffffff33"
//             strokeWidth={4}
//             strokeLinecap="round"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{ duration: 1.2, delay: i * 0.15 }}
//           />
//         ))}
//       </svg>

//       <div className="grid grid-cols-2 gap-8 mt-16">
//         {rooms.map((room, index) => (
//           <motion.div
//             key={room.id}
//             ref={el => { if (el) roomRefs.current[index] = el; }}
//             className={`w-44 h-44 rounded-2xl ${room.color} flex flex-col items-center justify-center text-xl font-semibold shadow-xl relative`}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.15 }}
//             whileHover={{ scale: 1.08 }}
//           >
//             {/* small icon */}
//             <div className="absolute -top-3 left-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
//               {room.id === "react" ? "⚛️" : room.id === "angular" ? "🅰️" : room.id === "vue" ? "🟢" : "⚡"}
//             </div>

//             <div className="text-center select-none">
//               <div className="text-sm opacity-90">{room.label}</div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function LabyrinthMap() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col items-center gap-6 p-10 text-white bg-[#111]">

      <motion.h1 
        className="text-3xl font-bold"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Labyrinth Map
      </motion.h1>

      <div className="grid grid-cols-2 gap-8">
        {rooms.map((room, index) => (
          <motion.button
            key={room.id}
            onClick={() => navigate(room.path)}
            className={`w-44 h-44 rounded-2xl ${room.color} flex items-center justify-center text-xl font-semibold shadow-xl`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.1, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {room.label}
          </motion.button>
        ))}
      </div>

    </div>
  );
}
