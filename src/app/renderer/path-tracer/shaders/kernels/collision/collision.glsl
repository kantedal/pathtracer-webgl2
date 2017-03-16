struct Collision {
  vec3 position;
  vec3 normal;
  vec2 uv;
  vec3 n0;
  vec3 n1;
  vec3 n2;
  int material_index;
  float distance;
};

#pragma glslify: export(Collision)