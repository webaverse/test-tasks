export const uniforms = {};
export const vertexShader = `
  uniform float uTide;
  varying vec3 vPosition;
  varying float steepness;
  void main(){
    steepness = 1.0 - normal.y;
    vPosition = vec3(position.x,position.y-5.0-uTide,position.z);
    csm_Position = vec3(position.x,max(position.y,1.0),position.z);
    csm_Normal = csm_Position.y>1.5?normal : vec3(0.0,1.0,0.0);
  }
`;

export const fragmentShader = `
  varying vec3 vPosition;
  varying float steepness;
  uniform vec3 liquidColor;
  uniform vec3 landColor;
  uniform vec3 rockColor;
  void main(){
    vec3 baseColor = mix(liquidColor,landColor,clamp(vPosition.y,0.0,1.0));
    vec3 terrain = mix(baseColor,rockColor,clamp(steepness * 2.0,0.0,1.0));
    csm_Roughness = vPosition.y*0.3+2.6;
    csm_DiffuseColor=vec4(terrain.xyz,1.0);
  }
`;
