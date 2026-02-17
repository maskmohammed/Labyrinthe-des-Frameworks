import { motion } from "framer-motion";
import React from "react";
import grass from "../assets/images/grass.png";
import wall from "../assets/images/wall2.png";
import roomTile from "../assets/images/room.png";
import trigger from "../assets/images/trigger.png";
import lock from "../assets/images/lockTile.png";

type TileProps = {
  type: string;
};

function Tile({ type }: TileProps) {
  const base = "w-full h-full bg-center bg-cover image-render-pixelated";

  if (type === "grass") return <div className={base} style={{ backgroundImage: `url(${grass})` }} />;

  if (type === "wall") return <div className={base} style={{ backgroundImage: `url(${wall})` }} />;

  if (type === "water")
    return (
      <motion.div
        className={`${base} bg-blue-500`}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    );

  if (type === "stone")
    return <div className={`${base} bg-gray-500`} />;

  if (type === "room")
    return (
      <motion.div
        className={base}
        style={{ backgroundImage: `url(${roomTile})` }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      />
    );
  
  if (type === "trigger")
    return (
      <motion.div
        className={base}
        style={{ backgroundImage: `url(${trigger})` }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />
    );

  if (type === "lock")
    return <div className={base} style={{ backgroundImage: `url(${lock})` }} />;
  
  if (type === "tree")
  return (
    <motion.div
      className={`${base} bg-green-800 rounded-sm shadow-lg`}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );

  if (type === "rock")
    return <div className={`${base} bg-gray-600 rounded-sm shadow-md`} />;

  if (type === "flower")
    return (
      <motion.div
        className={`${base} bg-pink-400`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      />
    );

  return <div className={`${base} bg-gray-300`} />;
} 

export default React.memo(Tile);