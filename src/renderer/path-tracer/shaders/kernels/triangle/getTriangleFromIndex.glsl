#pragma glslify: getSample = require(../helpers/getSample.glsl)

#define SAMPLE_STEP_128 vec2(1,0) / 128.0
#define SAMPLE_STEP_256 vec2(1,0) / 256.0
#define SAMPLE_STEP_512 vec2(1,0) / 512.0
#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0
#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0

Triangle GetTriangleFromIndex(float triangle_index) {
  // Fetch triangle from texture
  vec2 start_sample = SAMPLE_STEP_2048 * triangle_index * 11.0;

  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);
  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);
  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);
  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);
  vec2 sample5 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 4.0);
  vec2 sample6 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 5.0);
  vec2 sample7 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 6.0);
  vec2 sample8 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 7.0);
  vec2 sample9 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 8.0);
  vec2 sample10 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 9.0);

  vec3 v0 = vec3(texture(u_triangle_texture, sample1));
  vec3 edge1 = vec3(texture(u_triangle_texture, sample2));
  vec3 edge2 = vec3(texture(u_triangle_texture, sample3));

  vec3 n0 = vec3(texture(u_triangle_texture, sample4));
  vec3 n1 = vec3(texture(u_triangle_texture, sample5));
  vec3 n2 = vec3(texture(u_triangle_texture, sample6));

  vec2 uv0 = vec2(texture(u_triangle_texture, sample7));
  vec2 uv1 = vec2(texture(u_triangle_texture, sample8));
  vec2 uv2 = vec2(texture(u_triangle_texture, sample9));

  int material_index = int(texture(u_triangle_texture, sample10).x);
  float triangle_area = texture(u_light_texture, sample10).z;

  return Triangle(v0, edge1, edge2, n0, n1, n2, uv0, uv1, uv2, triangle_area, material_index);
}


#pragma glslify: export(GetTriangleFromIndex)