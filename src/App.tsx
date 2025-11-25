import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LabyrinthMap from "./components/LabyrinthMap";
import RoomReact from "./rooms/RoomReact";
import RoomAngular from "./rooms/RoomAngular";
import RoomVue from "./rooms/RoomVue";
import RoomNext from "./rooms/RoomNext";
import OverworldMap from "./components/OverworldMap";
import WikaliloRoom from "./rooms/WikaliloRoom";
import Oct29Room from "./rooms/Oct29Room";
import Home from "./components/Home";
import Congrats from "./components/Congrats";

export default function App() {
  const [inventory, setInventory] = useState<Set<string>>(new Set());
  return (
    <div className="app">
      

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react" element={<RoomReact />} />
          <Route path="/angular" element={<RoomAngular />} />
          <Route path="/vue" element={<RoomVue />} />
          <Route path="/next" element={<RoomNext />} />
          <Route path="/map" element={<OverworldMap inventory={inventory} setInventory={setInventory}  />} />
          <Route path="/room1" element={<WikaliloRoom setInventory={setInventory} />} />
          <Route path="/room2" element={<Oct29Room />} />
          <Route path="/congrats" element={<Congrats />} />
        </Routes>
      </main>
    </div>
  );
}
