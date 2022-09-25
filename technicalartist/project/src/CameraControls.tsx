import { OrbitControls } from "@react-three/drei";

export const CameraControls = () => {
  return (
    <OrbitControls
      enablePan={false}
      enableDamping
      maxPolarAngle={Math.PI / 2 - 0.05}
      minPolarAngle={0}
    />
  );
};
