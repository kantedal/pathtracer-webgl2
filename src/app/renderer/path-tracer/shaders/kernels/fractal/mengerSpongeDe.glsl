float mengerSpongeDe(vec3 w) {
  int Iterations = 5;
  vec3 offset = vec3(spongeOffset);
  float scale = spongeScale;

  w = (w * 0.5 + vec3(0.5)) * scale;  // scale [-1, 1] range to [0, 1]

  vec3 v = abs(w - halfSpongeScale) - halfSpongeScale;
  float d1 = max(v.x, max(v.y, v.z));     // distance to the box
  float d = d1;
  float p = 1.0;
  vec3 cd = v;

  for (int i = 0; i < Iterations; i++) {
    vec3 a = mod(3.0 * w * p, 3.0);
    p *= 3.0;

    v = vec3(0.5) - abs(a - vec3(1.5)) + offset;

    // distance inside the 3 axis aligned square tubes
    d1 = min(max(v.x, v.z), min(max(v.x, v.y), max(v.y, v.z))) / p;

    // intersection
    d = max(d, d1);
  }

  // The distance estimate, min distance, and fractional iteration count
  return d * 2.0;
}

#pragma glslify: export(mengerSpongeDe)