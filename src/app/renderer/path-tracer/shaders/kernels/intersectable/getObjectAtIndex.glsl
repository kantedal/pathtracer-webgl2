#pragma glslify: getSample = require(../helpers/getSample.glsl)

void getObjectAtIndex(int index, inout Object object) {
  vec2 start_sample = SAMPLE_STEP_512 * float(index) * 5.0;

  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 0.0);
  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 1.0);
  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 2.0);
  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 3.0);
  vec2 sample5 = getSample(start_sample, SAMPLE_STEP_512, 512.0, 4.0);

  vec3 bottom_bbox = vec3(texture(u_objects_texture, sample1));
  vec3 top_bbox = vec3(texture(u_objects_texture, sample2));
  vec3 position = vec3(texture(u_objects_texture, sample3));
  vec3 scale = vec3(texture(u_objects_texture, sample4));
  vec3 extra_data = vec3(texture(u_objects_texture, sample5));

  // Triangle model
  float bvh_start_index = extra_data.x;
  float triangle_start_index = extra_data.y;

  object = Object(bottom_bbox, top_bbox, position, scale, bvh_start_index, triangle_start_index);
}

#pragma glslify: export(getObjectAtIndex)