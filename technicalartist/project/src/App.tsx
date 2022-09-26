import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  const cameraPosition: [number, number, number] = [-270, 185, -375];
  return (
    <>
      <Canvas
        camera={{ position: cameraPosition, far: 10000, near: 1 }}
        gl={{ antialias: false }}
        shadows
      >
        <OrbitControls
          enablePan={false}
          enableDamping
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={0}
        />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
}
