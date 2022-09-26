uniform float uTime;

varying vec3 vPosition;
varying float steepness;

void main(){
  steepness = 1.0 - normal.y;
  vPosition = vec3(position.x,position.y-5.0-cos(uTime*.5),position.z);
  csm_Position = vec3(position.x,max(position.y,1.0),position.z);
  csm_Normal = csm_Position.y>1.5?normal : vec3(0.0,1.0,0.0);
}
