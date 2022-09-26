import {
  Environment,
  useGLTF,
  Sky,
  calcPosFromAngles,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Color, FogExp2, MeshStandardMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import CustomShaderMaterialType from "three-custom-shader-material/vanilla";
import CustomShaderMaterial from "three-custom-shader-material";
import { folder, useControls } from "leva";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

interface IGLTF extends GLTF {
  nodes: { [key: string]: THREE.Mesh };
}

export const Scene = () => {
  const { fog, pmrem, azimuth, inclination, liquid, rock, ground } =
    useControls({
      sun: folder({
        azimuth: { value: -0.42, min: -Math.PI / 4, max: Math.PI / 4 },
        inclination: { value: 0.065, min: 0.058, max: 0.08, step: 0.0001 },
      }),
      fog: { value: "#e8e6bf" },
      pmrem: {
        options: ["sunset", "dawn", "night", "park"],
        value: "park",
      },
      liquid: { value: "#312e00" },
      rock: { value: "#2a2a2a" },
      ground: { value: "#003813" },
    });
  const {
    nodes: { mesh_0 },
  } = useGLTF("/terrain.glb") as any as IGLTF;
  const geometry = mesh_0.geometry;
  geometry.computeVertexNormals();
  const material = useRef<CustomShaderMaterialType | null>(null);
  const { scene } = useThree();
  scene.fog = new FogExp2(fog, 0.0003);
  scene.background = new Color(fog);
  useFrame((state) => {
    if (material?.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.liquidColor.value.set(liquid);
      material.current.uniforms.rockColor.value.set(rock);
      material.current.uniforms.landColor.value.set(ground);
    }
  });
  return (
    <>
      <Sky
        sunPosition={calcPosFromAngles(Math.PI / 2 - inclination, azimuth)}
        distance={10000}
      />
      <Environment preset={pmrem as any} />
      <directionalLight
        position={[0, 40, 0]}
        rotation={[Math.PI / 4, 0, 0]}
        intensity={2}
      />
      <mesh>
        <bufferGeometry
          attach="geometry"
          attributes={{
            position: geometry.attributes.position,
            normal: geometry.attributes.normal,
          }}
          index={geometry.index}
        />
        <CustomShaderMaterial
          ref={material}
          baseMaterial={MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          attach="material"
          metalness={0}
          uniforms={{
            uTime: { value: 0 },
            liquidColor: { value: new Color(0.0, 0.04, 0.02) },
            landColor: { value: new Color(0.0, 0.02, 0.0) },
            rockColor: { value: new Color(0.05, 0.05, 0.025) },
          }}
        />
      </mesh>
    </>
  );
};
