#pragma glslify: random = require(../helpers/random.glsl)

Ray createRay(vec2 pixel_position, int sample_step) {
  float width = 512.0;
  float height = 512.0;

  float i = (pixel_position.x / width) - 0.5;
  float j = (pixel_position.y / height) - 0.5;
  vec3 image_point = i * 1.5 * camera_right + j * 1.5 * camera_up + camera_position + camera_direction;

  vec3 dx = (camera_up / width);
  vec3 dy = (camera_right / height);
  vec3 rand_x = dx * random(vec3(1.9898, 128.13, 7.7182), time + float(sample_step));
  vec3 rand_y = dy * random(vec3(134.9898, 36.342, 424.232), time + float(sample_step));
  image_point += rand_x + rand_y;

  vec3 direction = normalize(image_point - camera_position);

  return Ray(camera_position, direction);
}

#pragma glslify: export(createRay)