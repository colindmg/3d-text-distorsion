import { Canvas } from "@react-three/fiber";
import Ring from "./Ring";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <main className="h-screen w-screen">
      <Canvas className="bg-black">
        <ambientLight intensity={1} />
        <Ring
          radius={2}
          height={4}
          segments={32}
          // text="F R A I S C O M M E U N G A R D O N "
          text="G M D N I L O C G M D N I L O C"
        />
        <OrbitControls />
      </Canvas>
    </main>
  );
}
