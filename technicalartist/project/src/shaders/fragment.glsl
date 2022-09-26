uniform vec3 liquidColor;
uniform vec3 landColor;
uniform vec3 rockColor;
uniform vec3 sunDirection;
uniform vec3 cameraPos;
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
  vec2 levels = vec2(hash(coord.xz),coord.y);
  float value = noise(coord.xz / 4.);
  value += noise(levels / 2.)*.7;
  value += noise(levels)*.6;
  value += noise(coord.zx * 2.);
  return value;
}

vec3 rippleDirection = vec3(1.,0.,0.);

void main(){
  float waterY = vPosition.y+2.-cos(uTime*.5);
  vec3 land = landColor*(1.+0.3*landNoise(vPosition.xz));
  vec3 baseColor = mix(liquidColor,land,clamp(vPosition.y+7.,0.0,1.0));
  vec3 rocks = rockColor*(0.5+0.5*rockNoise(vPosition));
  vec3 terrain = mix(baseColor,rocks, clamp(steepness *vPosition.y,.0,1.));
  csm_Roughness = waterY*0.3+2.6;
  csm_DiffuseColor=vec4(terrain.xyz,1.0);
}
