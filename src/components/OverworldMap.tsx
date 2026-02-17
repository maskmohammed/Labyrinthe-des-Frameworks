import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Player from "./Player";
import Tile from "./Tile";
import { mapLayout, TILE_SIZE } from "../map/mapData";
import { ROOMS } from "../map/rooms";
import DialogueBox from "./DialogueBox";
import { motion } from "framer-motion";
import RoomTransition from "./RoomTransition";
import ZeldaDoorTransition from "./ZeldaDoorTransition";
import HUD from "./HUD";
import MiniMap from "./MiniMap";
import WeatherFog from "./WeatherFog";
import IntroScroll from "./IntroScroll";
import ReactMemoryGame from "./ReactMemoryGame";
import { useNavigate } from "react-router-dom";
import AngularGate from "./AngularGate";
import VueGate from "./VueGate";
import NextGate from "./NextGate";
import WikaliloGate from "./WikaliloGate";
import Oct29Gate from "./Oct29Gate";
import TriggerWordle from "./TriggerWordle";
import LockTrap from "./LockTrap";

type Props = {
  inventory: Set<string>;
  setInventory: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function OverworldMap({ inventory, setInventory }: Props) {
  const navigate = useNavigate();
//   const [showIntro, setShowIntro] = useState(true);
  const roomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [transitionActive, setTransitionActive] = useState(false);

  const [roomMessage, setRoomMessage] = useState<string | null>(null);
  const [doorTransition, setDoorTransition] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [enteringRoom, setEnteringRoom] = useState(false);
  const [transitionColor, setTransitionColor] = useState<string>("white");
//   const [inventory, setInventory] = useState<Set<string>>(new Set());
  const [showOct29Gate, setShowOct29Gate] = useState(false);
  



  const mapWidth = mapLayout[0]?.length ?? 0;
  const mapHeight = mapLayout.length;
  

  const [dialogue, setDialogue] = useState<string[] | null>(null);
  const [dialogueAvatar, setDialogueAvatar] = useState<string | null>(null);
  const [cameraShake, setCameraShake] = useState(false);
  const [discoveredTiles, setDiscoveredTiles] = useState<Set<string>>(new Set());
  const [completedRooms, setCompletedRooms] = useState<Set<string>>(new Set());
  const [showVueGate, setShowVueGate] = useState(false);
  const [showNextGate, setShowNextGate] = useState(false);
  const [showWikaliloGate, setShowWikaliloGate] = useState(false);
  const [showWordle, setShowWordle] = useState(false);
//   useEffect(() => {
//     const bg = new Audio("/sounds/jazz.mp3");
//     bg.loop = true;
//     bg.volume = 0.00995;
//     bg.play();

//     return () => {
//         bg.pause();
//         bg.currentTime = 0;
//   };
// }, []);
  useEffect(() => {
    const handler = (e: any) => {
        if (e.detail === "trigger") {
        setShowWordle(true);
        }
    };

    window.addEventListener("challenge-start", handler);
    return () => window.removeEventListener("challenge-start", handler);
    }, []);





  const renderedTiles = useMemo(
    () =>
        mapLayout.map((row, y) =>
        row.map((tile, x) => ({ tile, x, y }))
        ),
    []
    );
  const [pendingChallenge, setPendingChallenge] = useState<string | null>(null);
    const [showChallengePrompt, setShowChallengePrompt] = useState(false);
    const [showMemoryGame, setShowMemoryGame] = useState(false);


    useEffect(() => {
    const handler = (e: any) => {
        setPendingChallenge(e.detail);
        setShowChallengePrompt(true);
    };

    window.addEventListener("challenge-start", handler);
    return () => window.removeEventListener("challenge-start", handler);
    }, []);
  const [showAngularGate, setShowAngularGate] = useState(false);
  const [showLockTrap, setShowLockTrap] = useState(false);
    useEffect(() => {
        const handler = () => setShowLockTrap(true);
        window.addEventListener("lock-trap", handler);
        return () => window.removeEventListener("lock-trap", handler);
    }, []);

//   useEffect(() => {
//     const handler = (e: any) => {
//         if (e.detail === "angular") {
//         setShowAngularGate(true);
//         }
//     };

//     window.addEventListener("challenge-start", handler);
//     return () => window.removeEventListener("challenge-start", handler);
//   }, []);

    // useEffect(() => {
    //     const handler = (e: any) => {
    //         if (e.detail === "vue") {
    //         setShowVueGate(true);
    //         }
    //     };
    //     window.addEventListener("challenge-start", handler);
    //     return () => window.removeEventListener("challenge-start", handler);
    // }, []);


        
  

  


  useEffect(() => {
    if (currentRoomId) {
      setTransitionActive(true);
      setTimeout(() => setTransitionActive(false), 300);
    }
  }, [currentRoomId]);

  useEffect(() => {
    const handler = () => {
        const room = ROOMS.find(r => r.id === currentRoomId);
        setTransitionColor(room?.color ?? "white");
        setEnteringRoom(true);
        setTimeout(() => setEnteringRoom(false), 350); 

        setDoorTransition(true);

        setTimeout(() => {
        setDoorTransition(false);
        }, 600); 
    };

    window.addEventListener("room-enter", handler);
    return () => window.removeEventListener("room-enter", handler);
    }, []);

    useEffect(() => {
    const shake = () => {
        setCameraShake(true);
        setTimeout(() => setCameraShake(false), 150);
    };

    window.addEventListener("player-hit-wall", shake);
    return () => window.removeEventListener("player-hit-wall", shake);
    }, []);

  const rooms = ROOMS.map((r) => ({
    id: r.id,
    label: r.label,
    color: r.color,
    path: r.path,
    message: r.message,
    avatar: r.avatar,
    messages: r.messages,
    requiresKey: r.requiresKey,
    x: r.x,  
    y: r.y   
  }));

  useEffect(() => {
    roomRefs.current = [];
    }, [rooms]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-overworld bg-cover bg-center "
      
    >
        {/* {showIntro && (
        <IntroScroll onFinish={() => setShowIntro(false)} />
        )} */}
      
      <motion.div
            animate={cameraShake ? { x: [-2, 2, -2, 2, 0] } : {}}
            transition={{ duration: 0.18 }}
            style={{ width: "100%", height: "100%" }}
        >

      <motion.div
        animate={{
          x: -playerPos.x + 240 - TILE_SIZE / 2,
          y: -playerPos.y + 160 - TILE_SIZE / 2,
          scale: currentRoomId ? 1.1 : 1,   // <<< ZOOM IN ROOM
        }}
        transition={{ type: "spring", stiffness: 60, damping: 18}}
        style={{
          width: mapWidth * TILE_SIZE,
          height: mapHeight * TILE_SIZE,
          position: "relative",
        }}
      >
        
        <Player
          rooms={rooms}
          roomRefs={roomRefs}
          setDialogue={setDialogue}
          setDialogueAvatar={setDialogueAvatar}
          setCurrentRoomId={setCurrentRoomId}
          onPlayerMove={(pos) => {
            setPlayerPos(pos);

            const tileX = Math.floor(pos.x / TILE_SIZE);
            const tileY = Math.floor(pos.y / TILE_SIZE);

            setDiscoveredTiles(prev => {
                const updated = new Set(prev);

                for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    updated.add(`${tileX + dx}-${tileY + dy}`);
                }
                }

                return updated;
            });
            
            }}
          completedRooms={completedRooms}
          inventory={inventory} 
          setInventory={setInventory}
        />

        {/* {ROOMS.map((room, i) => (
            <motion.div
                key={room.id}
                ref={(el) => {
                    roomRefs.current[i] = el;
                    }}
                className={`absolute ${room.color} text-white font-bold px-2 py-1 rounded ${
                completedRooms.has(room.id)
                    ? "opacity-50 grayscale"
                    : room.color
                }`}
                style={{
                    left: room.x * TILE_SIZE,
                    top: room.y * TILE_SIZE,
                }}
                animate={{
                    boxShadow: [
                    "0 0 4px rgba(255,255,255,0.3)",
                    "0 0 12px rgba(255,255,255,0.8)",
                    "0 0 4px rgba(255,255,255,0.3)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                >
                {room.label}
            </motion.div>
        ))} */}

        {renderedTiles.map((row) =>
            row.map(({ tile, x, y }) => {
                const key = `${x}-${y}`;
                const visible = discoveredTiles.has(key);
                // const visible = true;

                return (
                <div
                    key={key}
                    className="absolute transition-opacity duration-300"
                    style={{
                    left: x * TILE_SIZE,
                    top: y * TILE_SIZE,
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    opacity: visible ? 1 : 0,
                    filter: visible ? "none" : "blur(2px)",
                    }}
                >
                    <Tile type={tile} />
                </div>
                );
            })
            )}
      </motion.div>
      </motion.div>

      {dialogue && (
        <DialogueBox
          messages={dialogue}
          avatar={dialogueAvatar ?? undefined}
          onClose={() => setDialogue(null)}
        />
      )}

      {transitionActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black pointer-events-none z-50"
        />
      )}

      <MiniMap playerPos={playerPos} />


      <RoomTransition active={enteringRoom} color={transitionColor} />

      <ZeldaDoorTransition active={doorTransition} />
        {/* <div className="relative w-full h-full"> */}
            <HUD currentRoomId={currentRoomId} inventory={inventory} />
        {/* </div> */}


        <div
        className="pointer-events-none absolute inset-0 z-40"
        style={{
            background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
        }}
        />

        <WeatherFog />

        {showChallengePrompt && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white p-4 rounded-xl text-center shadow-xl">
            <p className="mb-3 text-sm">
            🚪 La salle est verrouillée.<br/>Veux-tu tenter le défi pour enter ?
            </p>

            <div className="flex justify-center gap-3">
            <button
                onClick={() => {
                setShowChallengePrompt(false);

                if (pendingChallenge === "react") setShowMemoryGame(true);
                if (pendingChallenge === "angular") setShowAngularGate(true);
                if (pendingChallenge === "vue") setShowVueGate(true);
                if (pendingChallenge === "next") setShowNextGate(true);
                //içi
                if (pendingChallenge === "wikalilo") setShowWikaliloGate(true);
                if (pendingChallenge === "29") setShowOct29Gate(true);

                setPendingChallenge(null);
                }}
                className="px-3 py-1 bg-green-500 rounded"
            >
                Oui, jouer
            </button>

            <button
                onClick={() => setShowChallengePrompt(false)}
                className="px-3 py-1 bg-red-500 rounded"
            >
                Non
            </button>
            </div>
        </div>
        )}

        {showMemoryGame && (
        <ReactMemoryGame
            onWin={() => {
            setInventory(prev => new Set(prev).add("react-key"));
            setShowMemoryGame(false);
            navigate("/react");
            }}
            onClose={() => setShowMemoryGame(false)}
        />
        )}

        {showAngularGate && (
        <AngularGate
            onClose={() => setShowAngularGate(false)}
            onSuccess={() => {
            setShowAngularGate(false);
            navigate("/angular"); 
            }}
        />
        )}

        {showVueGate && (
        <VueGate
            onClose={() => setShowVueGate(false)}
            onSuccess={() => {
            navigate("/vue"); 
            setShowVueGate(false);
            }}
        />
        )}

        {showNextGate && (
        <NextGate
            onClose={() => setShowNextGate(false)}
            onSuccess={() => {
            navigate("/next");
            setShowNextGate(false);
            }}
        />
        )}

        {showWikaliloGate && (
        <WikaliloGate
            onClose={() => setShowWikaliloGate(false)}
            onSuccess={() => {
            setShowWikaliloGate(false);
            navigate("/room1");
            }}
        />
        )}

        {showOct29Gate && (
        <Oct29Gate
            onClose={() => setShowOct29Gate(false)}
            onSuccess={() => {
            setInventory(prev => new Set(prev).add("oct29-key"));
            setShowOct29Gate(false);
            navigate("/room2");
            }}
        />
        )}

        {showWordle && (
        <TriggerWordle
            onClose={() => setShowWordle(false)}
            onSuccess={() => {
            setInventory(prev => new Set(prev).add("universal-key"));
            setShowWordle(false);
            }}
        />
        )}

        {showLockTrap && (
        <LockTrap
            onClose={() => setShowLockTrap(false)}
            onLoseKey={() => {
            setInventory(prev => {
                const newSet = new Set(prev);
                const first = newSet.values().next().value; 
                if (first) newSet.delete(first);
                return newSet;
            });
            }}
        />
        )}




    </div>
  );
}
