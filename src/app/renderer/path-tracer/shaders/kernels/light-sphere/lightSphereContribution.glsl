#pragma glslify: Ray = require("../ray/Ray.glsl")

vec3 lightSphereContribution(Ray ray) {
  vec3 sun_position = normalize(vec3(1.0, 1.0, 1.0));
  vec3 position = vec3(0,0,0);
  float radius = 100.0;

  vec3 op = position - ray.start_position;
  float t, epsilon = 0.0001;
  float b = dot(op, ray.direction);
  float disc = b * b - dot(op, op) + radius * radius;
  if (disc < 0.0) return vec3(0,0,0);
  else disc = sqrt(disc);

  t = (t = b - disc) > epsilon ? t : ((t = b + disc) > epsilon ? t : 0.0);

  if (t < 0.01)
    return vec3(0,0,0);

  vec3 collision_position = (ray.start_position + ray.direction * t) / 100.0;
  vec3 normal = normalize(collision_position);
  float u = 0.5 - atan(normal.z, normal.x) / 6.28;
  float v = 0.5 - 2.0 * asin(normal.y) / 6.28;

  vec3 clr = texture(u_dome_texture, vec2(u,v)).rgb;
  return clr;
}
#pragma glslify: export(lightSphereContribution)