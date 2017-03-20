#pragma glslify: distanceEstimator = require("./distanceEstimator.glsl", Power=Power, Bailout=Bailout)

vec3 calculateNormal(vec3 pos) {
  float e = 0.00001;
  float n = distanceEstimator(pos);
  float dx = distanceEstimator(pos + vec3(e, 0, 0)) - n;
  float dy = distanceEstimator(pos + vec3(0, e, 0)) - n;
  float dz = distanceEstimator(pos + vec3(0, 0, e)) - n;

  vec3 grad = vec3(dx,dy,dz);
  return normalize(grad);
}

#pragma glslify: export(calculateNormal)