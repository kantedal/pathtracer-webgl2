#pragma glslify: Ray = require("./Ray.glsl")
#pragma glslify: random = require("glsl-random")


mat3 rotationMatrixVector(vec3 v, float angle) {
  float c = cos(angle);
  float s = sin(angle);

  return mat3(c + (1.0 - c) * v.x * v.x, (1.0 - c) * v.x * v.y - s * v.z, (1.0 - c) * v.x * v.z + s * v.y,
            (1.0 - c) * v.x * v.y + s * v.z, c + (1.0 - c) * v.y * v.y, (1.0 - c) * v.y * v.z - s * v.x,
            (1.0 - c) * v.x * v.z - s * v.y, (1.0 - c) * v.y * v.z + s * v.x, c + (1.0 - c) * v.z * v.z);
}

Ray createRay(vec2 pixel_position, int sample_step) {

  mat3 cameraRotation = rotationMatrixVector(vec3(0, 1, 0), yaw) * rotationMatrixVector(vec3(0, 0, 1), pitch);

  float width = resolution.x;
  float height = resolution.y;

  float i = ((pixel_position.x / width) - 0.5) * width / height;
  float j = ((pixel_position.y / height) - 0.5);
  vec3 image_point = i * 1.5 * camera_right + j * 1.5 * camera_up + camera_position + cross(camera_up, camera_right);

  vec3 dx = (camera_up / width);
  vec3 dy = (camera_right / height);
  vec3 rand_x = dx * random(vec2(pixel_position.x, pixel_position.y) * vec2(1.9898, 128.13) * (time + float(sample_step)));
  vec3 rand_y = dy * random(vec2(pixel_position.x, pixel_position.y) * vec2(134.9898, 36.342) * (time + float(sample_step)));
  image_point += rand_x + rand_y;

  vec3 direction = normalize(cameraRotation * (image_point - camera_position));

  return Ray(camera_position, direction);
}

#pragma glslify: export(createRay)