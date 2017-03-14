float boundingBoxCollision(vec3 bottom, vec3 top, Ray r, float is_leaf) {
  vec3 dirfrac = vec3(1,1,1) / r.direction;

  vec3 t1 = (bottom - r.start_position) * dirfrac;
  vec3 t2 = (top - r.start_position) * dirfrac;

  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));
  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));

  if (tmax < 0.0 || tmin > tmax) return 10000.0;

  return tmin;
}

#pragma glslify: export(boundingBoxCollision)