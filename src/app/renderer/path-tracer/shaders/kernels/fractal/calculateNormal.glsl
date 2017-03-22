vec3 calculateNormal(vec3 pos) {
  float e = 0.000001;
  float n = distanceEstimator(pos);
  float dx = distanceEstimator(pos + vec3(e, 0, 0)) - n;
  float dy = distanceEstimator(pos + vec3(0, e, 0)) - n;
  float dz = distanceEstimator(pos + vec3(0, 0, e)) - n;

  vec3 grad = vec3(dx,dy,dz);
  return normalize(grad);
}

//vec3 calculateNormal(vec3 pos) {
//  float e = minDistance * 0.5;
//  //float n = distanceEstimator(pos);
//
//  float dx1 = distanceEstimator(pos + vec3(e, 0, 0));
//  float dx2  = distanceEstimator(pos - vec3(e, 0, 0));
//
//  float dy1 = distanceEstimator(pos + vec3(0, e, 0));
//  float dy2 = distanceEstimator(pos - vec3(0, e, 0));
//
//  float dz1 = distanceEstimator(pos + vec3(0, 0, e));
//  float dz2 = distanceEstimator(pos - vec3(0, 0, e));
//
//  return normalize(vec3(dx1 - dx2, dy1 - dy2, dz1 - dz2));
//}


#pragma glslify: export(calculateNormal)