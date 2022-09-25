import { Environment, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Color, FogExp2, MeshStandardMaterial } from "three";
import { vertexShader, fragmentShader } from "./shaders";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import CustomShaderMaterialType from "three-custom-shader-material/vanilla";
import CustomShaderMaterial from "three-custom-shader-material";

interface IGLTF extends GLTF {
  nodes: { [key: string]: THREE.Mesh };
}

export const Scene = () => {
  const {
    nodes: { mesh_0 },
  } = useGLTF("/terrain.glb") as any as IGLTF;
  const geometry = mesh_0.geometry;
  geometry.computeVertexNormals();
  const material = useRef<CustomShaderMaterialType | null>(null);
  useFrame((state) => {
    console.log(state.clock.elapsedTime);
    if (material?.current) {
      material.current.uniforms.uTide.value = Math.cos(state.clock.elapsedTime);
    }
  });
  const { scene } = useThree();
  scene.fog = new FogExp2(0xffdcff, 0.0003);
  scene.background = new Color(0xffdcff);
  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        position={[0, 40, 0]}
        rotation={[Math.PI / 4, 0, 0]}
        intensity={2}
      />
      <mesh>
        <CustomShaderMaterial
          ref={material}
          baseMaterial={MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          attach="material"
          metalness={0}
          uniforms={{
            uTide: { value: 0 },
            liquidColor: { value: new Color(0.0, 0.06, 0.07) },
            landColor: { value: new Color(0.0, 0.02, 0.0) },
            rockColor: { value: new Color(0.05, 0.05, 0.025) },
          }}
        />
        <bufferGeometry
          attach="geometry"
          attributes={{
            position: geometry.attributes.position,
            normal: geometry.attributes.normal,
          }}
          index={geometry.index}
        />
      </mesh>
    </>
  );
};
