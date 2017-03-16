#pragma glslify: Ray = require("../ray/Ray.glsl")

float triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision, float closest_collision_distance) {
 // if (dot(ray.direction, triangle.n0) > 0.0) return -1.0;

  vec3 v0 = object_position + triangle.v0;
  vec3 edge1 = triangle.edge1;
  vec3 edge2 = triangle.edge2;

  //Begin calculating determinant - also used to calculate u parameter
  vec3 P = cross(ray.direction, edge2);
  float det = dot(edge1, P);

  if (det > -EPS && det < EPS) return -1.0;

  //Distance from vertex1 to ray origin
  vec3 T = ray.start_position - v0;
  float u = dot(T, P);
  if (u < 0.0 || u > det) return -1.0;

  vec3 Q = cross(T, edge1);

  float v = dot(ray.direction, Q);
  if(v < 0.0 || u+v > det) return -1.0;

  float t = dot(edge2, Q);

  if(t < EPS) return -1.0;

  float inv_det = 1.0 / det;

  collision.position = ray.start_position + inv_det * t * ray.direction;
  collision.distance = length(ray.start_position - collision.position);

  if (closest_collision_distance < collision.distance) return -1.0;

  collision.material_index = triangle.material_index;

  u = u * inv_det;
  v = v * inv_det;
  collision.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;
  collision.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;

  return 1.0;
}

#pragma glslify: export(triangleIntersection)