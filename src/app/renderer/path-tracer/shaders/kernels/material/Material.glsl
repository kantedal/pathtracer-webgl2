struct Material {
  vec3 color;
  int material_type;
  float emission_rate;
  float material_parameter1;
  float material_parameter2;
};

#pragma glslify: export(Material)