import {
  Environment,
  useGLTF,
  Sky,
  calcPosFromAngles,
  useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import {
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  FogExp2,
  MeshStandardMaterial,
} from "three";
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
  const [
    {
      fog,
      pmrem,
      azimuth,
      inclination,
      liquid,
      rock,
      ground,
      env,
      shadows,
      sun,
    },
    set,
  ] = useControls(() => ({
    preset: {
      value: "amazonia",
      options: ["amazonia", "antarctica", "namek"],
      onChange: (value) => {
        switch (value) {
          case "amazonia":
            set({ liquid: "#765a2b", rock: "#414141", ground: "#215400" });
            return;
          case "antarctica":
            set({ liquid: "#0a081a", rock: "#525252", ground: "#656565" });
            return;
          case "namek":
            set({ liquid: "#008041", rock: "#a76c6c", ground: "#25214e" });
            return;
        }
      },
    },
    palette: folder({
      liquid: { value: "#765a2b" },
      rock: { value: "#414141" },
      ground: { value: "#215400" },
    }),
    lighting: folder({
      azimuth: {
        value: -0.42,
        min: -Math.PI / 4,
        max: Math.PI / 4,
        step: 0.00001,
      },
      inclination: { value: 0.09, min: 0.058, max: 0.4, step: 0.0001 },
      env: { value: 0.5, min: 0.1, max: 4 },
      pmrem: {
        options: ["sunset", "dawn", "night", "park", "mortal"],
        value: "dawn",
      },
      sun: { value: 0.9, min: 0.1, max: 1 },
      shadows: true,
      fog: { value: "#e8e6bf" },
    }),
  }));
  const {
    nodes: { mesh_0 },
  } = useGLTF("/terrain.glb") as any as IGLTF;
  const geometry = mesh_0.geometry;
  geometry.computeVertexNormals();
  const material = useRef<CustomShaderMaterialType | null>(null);
  const light = useRef<DirectionalLight | null>(null);
  const { scene, camera } = useThree();
  scene.fog = new FogExp2(fog, 0.0003);
  scene.background = new Color(fog);
  useFrame((state) => {
    if (material?.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.liquidColor.value.set(liquid);
      material.current.uniforms.rockColor.value.set(rock);
      material.current.uniforms.landColor.value.set(ground);
      material.current.uniforms.cameraPos.value.copy(camera.position);
      material.current.uniforms.sunDirection.value.copy(
        calcPosFromAngles(Math.PI / 2 - inclination, azimuth).normalize()
      );
    }
    if (light?.current) {
      light.current.position
        .copy(calcPosFromAngles(Math.PI / 2 - inclination, azimuth))
        .multiplyScalar(3500);
      light.current.lookAt(scene.position);
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
        intensity={sun}
        ref={light}
        castShadow={shadows}
        shadow-camera-bottom={-2000}
        shadow-camera-far={5000}
        shadow-camera-left={-2000}
        shadow-camera-right={2000}
        shadow-camera-top={2000}
        shadow-camera-near={-5000}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <mesh castShadow receiveShadow>
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
          envMapIntensity={env}
          metalness={0}
          uniforms={{
            uTime: { value: 0 },
            liquidColor: { value: new Color() },
            landColor: { value: new Color() },
            rockColor: { value: new Color(0) },
            cameraPos: { value: camera.position.clone() },
            sunDirection: {
              value: calcPosFromAngles(
                Math.PI / 2 - inclination,
                azimuth
              ).normalize(),
            },
          }}
        />
      </mesh>
    </>
  );
};
