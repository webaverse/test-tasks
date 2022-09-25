import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "./CameraControls";
import { Scene } from "./Scene";

export default function App() {
  const cameraPosition: [number, number, number] = [2000, 1000, 0];
  return (
    <Canvas
      camera={{ position: cameraPosition, far: 10000, near: 1 }}
      gl={{ antialias: false }}
    >
      <CameraControls />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
