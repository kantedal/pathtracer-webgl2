#pragma glslify: random = require(../helpers/random.glsl)

vec3 randomizePointOnTriangle(Triangle triangle) {
  float u = random(vec3(51.9898, 4567.13, 23.7182), time);
  float v = (1.0 - u) * random(vec3(4.9898, 421.13, 45.7182), 3243.232 * time + 245.642);

  vec3 v0 = triangle.v0;
  vec3 v1 = triangle.edge1 + v0;
  vec3 v2 = triangle.edge2 + v0;
  return (1.0 - u - v) * v0 + u * v1 + v * v2;
}

#pragma glslify: export(randomizePointOnTriangle)