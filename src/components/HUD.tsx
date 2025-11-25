// src/components/HUD.tsx
import { motion } from "framer-motion";
import { ROOMS } from "../map/rooms";

type Props = {
  currentRoomId: string | null;
  inventory: Set<string>;
};

export default function HUD({ currentRoomId, inventory }: Props) {
  const room = ROOMS.find(r => r.id === currentRoomId);
  const ICONS: Record<string, string> = {
    "universal-key": "🗝️",
  };

  return (
    <div>
        <div className="absolute top-2 left-2 z-50 flex items-center gap-3 text-white">

        {/* Room Icon */}
        {room && (
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl"
            >
            {room.avatar ?? "🏰"}
            </motion.div>
        )}

        {/* Room Name */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-1 rounded bg-black/60 text-sm font-semibold"
        >
            {room ? room.label : "Exploration"}
        </motion.div>

        {/* Fake player hearts */}
        <div className="flex gap-1 text-red-400 text-lg">
            ❤️ ❤️ ❤️
        </div>

        </div>
        
        <div className="absolute bottom-2 left-2 z-50 px-3 py-1 rounded bg-black/60 text-sm font-semibold text-white">
            {[...inventory].map(key => (
                <span key={key}>{ICONS[key] ?? "❓"}</span>
            ))}
            {inventory.size === 0 && <span>—</span>}
        </div>
    </div>
  );
}
