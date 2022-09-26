uniform vec3 liquidColor;
uniform vec3 landColor;
uniform vec3 rockColor;
uniform float uTime;

varying vec3 vPosition;
varying float steepness;

float hash(vec2 p){
  float h = dot(p,vec2(127.1,311.7));
  return -1.0 + 2.0*fract(sin(h)*43758.5453123);
}

float noise(in vec2 p){
  vec2 i = floor( p );
  vec2 f = fract( p );
  vec2 u = f*f*(3.0-2.0*f);
  return mix(
    mix(
      hash( i + vec2(0.0,0.0) ), 
      hash( i + vec2(1.0,0.0) ),
      u.x
    ),
    mix(
      hash( i + vec2(0.0,1.0) ), 
      hash( i + vec2(1.0,1.0) ), 
      u.x
    ), 
    u.y
  );
}

float wind(in vec2 coord){
  float value = noise(coord / 256.) * 256. * cos(uTime/30.);
  value += noise(coord / 128.) * 128.;
  value += noise(coord / 64.) * 64. * cos(uTime) * 0.01;
  value += noise(coord / 32.) * 32.;
  value += noise(coord / 16.) * 16.;
  value += noise(coord / 8.) * 8.  * sin(uTime+3.);
  return value * noise(coord/20.);
}

float landNoise(in vec2 coord){
  float value = noise(coord / 32.);
  value += noise(coord / 16.);
  value += noise(coord / 8.);
  value += noise(coord / 4.);
  value += noise(coord / 2.);
  value += noise(coord);
  return value;
}

float rockNoise(in vec3 coord){
  float value = noise(coord.yz / 4.);
  value += noise(coord.zx / 2.);
  value += noise(coord.zx);
  value += noise(coord.zx * 2.);
  value += noise(coord.zx * 4.);
  value += noise(coord.zx * 8.);
  return value;
}

void main(){
  float ripples = cos(wind(vPosition.xz+uTime));
  vec3 water = liquidColor*(1.+0.3*ripples*.1);
  vec3 land = landColor*(1.+0.3*landNoise(vPosition.xz));
  vec3 baseColor = mix(water,land,clamp(vPosition.y+5.,0.0,1.0));
  vec3 rocks = rockColor*(1.0+0.5*rockNoise(vPosition));
  vec3 terrain = mix(baseColor,rocks,steepness * clamp(vPosition.y,.0,2.));
  csm_Roughness = vPosition.y*0.3+2.6;
  csm_DiffuseColor=vec4(terrain.xyz,1.0);
}
