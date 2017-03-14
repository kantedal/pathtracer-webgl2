#pragma glslify: getSample = require(../helpers/getSample.glsl)

#define SAMPLE_STEP_128 vec2(1,0) / 128.0
#define SAMPLE_STEP_256 vec2(1,0) / 256.0
#define SAMPLE_STEP_512 vec2(1,0) / 512.0
#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0
#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0

float getTriangleIndex(float stackIdx) {
  vec2 start_sample = SAMPLE_STEP_1024 * stackIdx;
  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_1024, 1024.0, 0.0);

  vec4 triangle_index_slot = texture(u_triangle_index_texture, sample1);
  return triangle_index_slot.x;
}

#pragma glslify: export(getTriangleIndex)