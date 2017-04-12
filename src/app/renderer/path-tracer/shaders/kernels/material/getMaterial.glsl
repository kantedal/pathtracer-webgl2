#pragma glslify: Material = require("./Material.glsl")
#pragma glslify: getSample = require("../helpers/getSample.glsl")

#define SAMPLE_STEP_128 vec2(1,0) / 128.0
#define SAMPLE_STEP_256 vec2(1,0) / 256.0
#define SAMPLE_STEP_512 vec2(1,0) / 512.0
#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0
#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0

Material getMaterial(int material_index) {
  // Fetch material from texture
  vec2 start_sample = SAMPLE_STEP_512 * float(material_index) * 3.0;
  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 0.0);
  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 1.0);
  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 2.0);

  vec3 color = vec3(texture(materialTexture, sample1));
  vec3 extra_data1 = vec3(texture(materialTexture, sample2));
  vec3 extra_data2 = vec3(texture(materialTexture, sample3));

  int material_type = int(extra_data1.x);
  float emission_rate = extra_data1.y;

  float material_parameter1 = extra_data2.x;
  float material_parameter2 = extra_data2.y;
  float material_parameter3 = extra_data2.z;

  return Material(color, material_type, emission_rate, material_parameter1, material_parameter2, material_parameter3);
}

#pragma glslify: export(getMaterial)
