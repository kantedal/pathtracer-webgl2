#pragma glslify: Ray = require("../ray/Ray.glsl")


float triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision, float closest_collision_distance) {
  vec3 v0 = object_position + triangle.v0;

  //Begin calculating determinant - also used to calculate u parameter
  vec3 P = cross(ray.direction, triangle.edge2);
  float det = dot(triangle.edge1, P);

  //Distance from vertex1 to ray origin
  vec3 T = ray.start_position - v0;
  float u = dot(T, P);
  vec3 Q = cross(T, triangle.edge1);
  float v = dot(ray.direction, Q);
  float t = dot(triangle.edge2, Q);

  if(t < EPS || v < 0.0 || u+v > det || u < 0.0 || u > det || (det > -EPS && det < EPS)) return -1.0;

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

//float triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision, float closest_collision_distance) {
//  vec3 e1 = triangle.edge1;
//  vec3 e2 = triangle.edge2;
//
//  vec3 normal = normalize(cross(e1,e2));
//  float b = dot(normal, ray.direction);
//
//  vec3 w0 = ray.start_position - triangle.v0;
//  float a = -dot(normal, w0);
//  float t = a / b;
//
//  vec3 p = ray.start_position + t * ray.direction;
//  float uu, uv, vv, wu, wv, inverseD;
//  uu = dot(e1,e1);
//  uv = dot(e1,e2);
//  vv = dot(e2,e2);
//
//  vec3 w = p - triangle.v0;
//  wu = dot(w, e1);
//  wv = dot(w, e2);
//  inverseD = uv * uv - uu * vv;
//  inverseD = 1.0 / inverseD;
//
//  float u = (uv * wv - vv * wu) * inverseD;
//  if (u < 0.0 || u > 1.0) return -1.0;
//
//  float v = (uv * wu - uu * wv) * inverseD;
//  if (v < 0.0 || (u + v) > 1.0) return -1.0;
//
//  collision.position = p; //ray.start_position + inverseD * t * ray.direction;
//  collision.distance = length(ray.start_position - collision.position);
//
//  //if (closest_collision_distance < collision.distance) return -1.0;
//
//  collision.material_index = triangle.material_index;
//  collision.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;
//  collision.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;
//
//  return 1.0;
//}

#pragma glslify: export(triangleIntersection)