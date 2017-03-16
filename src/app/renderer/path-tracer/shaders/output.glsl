#version 300 es
precision lowp float;
#define GLSLIFY 1

in vec2 v_texCoord;
out vec4 outColor;

uniform float time;
uniform float samples;
uniform int trace_depth;
uniform float global_lightning_enabled;
uniform int triangle_count;
uniform int object_count;
uniform vec2 resolution;

// Camera uniforms
uniform vec3 camera_position;
uniform vec3 camera_direction;
uniform vec3 camera_right;
uniform vec3 camera_up;

uniform sampler2D u_accumulated_texture;
uniform sampler2D u_buffer_texture;
uniform sampler2D u_triangle_texture;
uniform sampler2D u_triangle_index_texture;
uniform sampler2D u_bvh_texture;
uniform sampler2D u_light_texture;
uniform sampler2D u_material_texture;
uniform sampler2D u_objects_bvh_texture;
uniform sampler2D u_objects_texture;
uniform sampler2D u_light_sphere_texture;

#define EPS 0.000001
#define PI 3.14

#define SAMPLE_STEP_128 vec2(1,0) / 128.0
#define SAMPLE_STEP_256 vec2(1,0) / 256.0
#define SAMPLE_STEP_512 vec2(1,0) / 512.0
#define SAMPLE_STEP_1024 vec2(1,0) / 1024.0
#define SAMPLE_STEP_2048 vec2(1,0) / 2048.0

#define DIFFUSE_MATERIAL 0
#define SPECULAR_MATERIAL 1
#define EMISSION_MATERIAL 2
#define TRANSMISSION_MATERIAL 3
#define GLOSSY_MATERIAL 5

struct Collision {
  vec3 position;
  vec3 normal;
  vec2 uv;
  vec3 n0;
  vec3 n1;
  vec3 n2;
  int material_index;
  float distance;
};

struct Triangle {
  vec3 v0;
  vec3 edge1;
  vec3 edge2;
  vec3 n0;
  vec3 n1;
  vec3 n2;
  vec2 uv0;
  vec2 uv1;
  vec2 uv2;
  float triangle_area;
  int material_index;
};

struct Object {
  vec3 bounding_bottom;
  vec3 bounding_top;
  vec3 position;
  vec3 scale;
  float object_bvh_start_index;
  float triangle_start_index;
};

// Ray
struct Ray {
  vec3 start_position;
  vec3 direction;
};

highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

Ray createRay(vec2 pixel_position, int sample_step) {
  float width = resolution.x;
  float height = resolution.y;

  float i = ((pixel_position.x / width) - 0.5) * width / height;
  float j = ((pixel_position.y / height) - 0.5);
  vec3 image_point = i * 1.5 * camera_right + j * 1.5 * camera_up + camera_position + camera_direction;

  vec3 dx = (camera_up / width);
  vec3 dy = (camera_right / height);
  vec3 rand_x = dx * random(vec2(pixel_position.x, pixel_position.y) * vec2(1.9898, 128.13) * (time + float(sample_step)));
  vec3 rand_y = dy * random(vec2(pixel_position.x, pixel_position.y) * vec2(134.9898, 36.342) * (time + float(sample_step)));
  image_point += rand_x + rand_y;

  vec3 direction = normalize(image_point - camera_position);

  return Ray(camera_position, direction);
}

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

  vec3 clr = texture(u_light_sphere_texture, vec2(u,v)).rgb;
  return clr;
}

// Material
struct Material {
  vec3 color;
  int material_type;
  float emission_rate;
  float material_parameter1;
  float material_parameter2;
};

vec2 getSample(vec2 start_sample, vec2 sample_step, float resolution, float steps) {
  float s = start_sample.x + steps * sample_step.x;
  return vec2(fract(s), floor(s) / resolution);
}

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

  vec3 color = vec3(texture(u_material_texture, sample1));
  vec3 extra_data1 = vec3(texture(u_material_texture, sample2));
  vec3 extra_data2 = vec3(texture(u_material_texture, sample3));

  int material_type = int(extra_data1.x);
  float emission_rate = extra_data1.y;

  float material_parameter1 = extra_data2.x;
  float material_parameter2 = extra_data2.y;

  return Material(color, material_type, emission_rate, material_parameter1, material_parameter2);
}

#define DIFFUSE_MATERIAL 0
#define SPECULAR_MATERIAL 1
#define EMISSION_MATERIAL 2
#define TRANSMISSION_MATERIAL 3
#define GLOSSY_MATERIAL 5

vec3 BRDF(Ray ray, Material material, vec2 uv, vec3 collision_normal, vec3 next_dir) {

//  // Emission material
//  if (material.material_type == EMISSION_MATERIAL) {
//    return material.color;
//  }
//
//  // Specular material
//  if (material.material_type == SPECULAR_MATERIAL) {
//    return material.color;
//  }
//
//  // Transmission material
//  if (material.material_type == TRANSMISSION_MATERIAL) {
//    return material.color;
//  }
//
//  // Glossy material
//  if (material.material_type == GLOSSY_MATERIAL) {
//    return material.color;
//  }

  // Lambertian diffuse material
  if (material.material_type == DIFFUSE_MATERIAL) {
    float albedo = material.material_parameter1; // material parameter 1 is albedo
    float roughness = material.material_parameter2; // material parameter 2 is roughness
    vec3 view_direction = -1.0 * ray.direction;

    // calculate intermediary values
    float NdotL = dot(collision_normal, next_dir);
    float NdotV = dot(collision_normal, view_direction);

    float angleVN = acos(NdotV);
    float angleLN = acos(NdotL);

    float alpha = max(angleVN, angleLN);
    float beta = min(angleVN, angleLN);
    float gamma = dot(view_direction - collision_normal * dot(view_direction, collision_normal), next_dir - collision_normal * dot(next_dir, collision_normal));

    float roughnessSquared = roughness * roughness;

    // calculate A and B
    float A = 1.0 - 0.5 * (roughnessSquared / (roughnessSquared + 0.57));
    float B = 0.45 * (roughnessSquared / (roughnessSquared + 0.09));
    float C = sin(alpha) * tan(beta);

    // put it all together
    float L1 = max(0.0, NdotL) * (A + B * max(0.0, gamma) * C);

    // get the final color
    return material.color * L1;
  }

  return material.color;
}

#define DIFFUSE_MATERIAL 0
#define SPECULAR_MATERIAL 1
#define EMISSION_MATERIAL 2
#define TRANSMISSION_MATERIAL 3
#define GLOSSY_MATERIAL 5

vec3 PDF(Ray ray, Material material, vec3 collision_normal, float iteration, inout float distribution) {
  vec3 real_normal = dot(collision_normal, ray.direction) > 0.0 ? -1.0 * collision_normal : collision_normal;
  vec3 next_dir;

  if (material.material_type == DIFFUSE_MATERIAL) {
    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(0.24, 78.233) * (time + 32.0 * iteration));
    float r2 = random(v_texCoord * vec2(63.7264, 10.873) * (time + 12.0 * iteration));
    float r2s = sqrt(r2);

    vec3 w = collision_normal;

    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));
    vec3 v = cross(w, u);

    // compute cosine weighted random ray direction on hemisphere
    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));

    return next_dir;
  }

  // Fully specular material
  if (material.material_type == SPECULAR_MATERIAL) {
    return normalize(ray.direction - 2.0 * dot(ray.direction, collision_normal) * collision_normal);
  }

  // Glossy material
  if (material.material_type == GLOSSY_MATERIAL) {
    vec3 reflected = normalize(ray.direction - 2.0 * dot(ray.direction, collision_normal) * collision_normal);

    float r1 = 2.0 * 3.14 * random(v_texCoord * vec2(521.9898, 2321.233) * (time + 100.0 * iteration));
    float r2 = random(v_texCoord * vec2(2631.7264, 5.873) * (time + 12.0 * iteration));
    float r2s = pow(r2, material.material_parameter1);

    vec3 w = reflected;
    vec3 u = normalize(cross(mix(vec3(1,0,0), vec3(0,1,0), step(0.1, abs(w.x))), w));
    vec3 v = cross(w, u);

    // compute cosine weighted random ray direction on hemisphere
    next_dir = normalize(u * cos(r1) * r2s + v * sin(r1) * r2s + w * sqrt(1.0 - r2));
    return next_dir;
  }

  if (material.material_type == TRANSMISSION_MATERIAL) {
    bool into = dot(collision_normal, real_normal) > 0.0; // is ray entering or leaving refractive material?
    float nc = 1.0;  // Index of Refraction air
    float nt = 1.5;  // Index of Refraction glass/water
    float nnt = into ? nc / nt : nt / nc;  // IOR ratio of refractive materials
    float ddn = dot(ray.direction, real_normal);
    float cos2t = 1.0 - nnt*nnt * (1.0 - ddn*ddn);

    if (cos2t < 0.0) // total internal reflection
    {
        next_dir = normalize(ray.direction - collision_normal * 2.0 * dot(collision_normal, ray.direction));
    }
    else // cos2t > 0
    {
      // compute direction of transmission ray
      vec3 tdir = ray.direction * nnt;
      tdir -= normalize(collision_normal * ((into ? 1.0 : -1.0) * (ddn * nnt + sqrt(cos2t))));

      float R0 = (nt - nc)*(nt - nc) / (nt + nc)*(nt + nc);
      float c = 1.0 - (into ? -ddn : dot(tdir, collision_normal));
      float Re = R0 + (1.0 - R0) * c * c * c * c * c;
      float Tr = 1.0 - Re; // Transmission
      float P = 0.25 + 0.5 * Re;
      float RP = Re / P;
      float TP = Tr / (1.0 - P);

      // randomly choose reflection or transmission ray
      float rand = random(v_texCoord * vec2(86.425, 145.233) * (time + iteration));
      if (rand < 0.2) // reflection ray
      {
        distribution = RP;
        next_dir = normalize(ray.direction - collision_normal * 2.0 * dot(collision_normal, ray.direction));
      }
      else // transmission ray
      {
        distribution = TP;
        next_dir = normalize(tdir);
      }

      return next_dir;
    }
  }

  return vec3(0,0,0);
}

// Triangle

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

float triangleIntersection(Ray ray, Triangle triangle, vec3 object_position, inout Collision collision_1, float closest_collision_distance) {
 // if (dot(ray.direction, triangle.n0) > 0.0) return -1.0;

  vec3 v0_0 = object_position + triangle.v0;
  vec3 edge1 = triangle.edge1;
  vec3 edge2 = triangle.edge2;

  //Begin calculating determinant - also used to calculate u parameter
  vec3 P = cross(ray.direction, edge2);
  float det = dot(edge1, P);

  if (det > -EPS && det < EPS) return -1.0;

  //Distance from vertex1 to ray origin
  vec3 T = ray.start_position - v0_0;
  float u = dot(T, P);
  if (u < 0.0 || u > det) return -1.0;

  vec3 Q = cross(T, edge1);

  float v = dot(ray.direction, Q);
  if(v < 0.0 || u+v > det) return -1.0;

  float t = dot(edge2, Q);

  if(t < EPS) return -1.0;

  float inv_det = 1.0 / det;

  collision_1.position = ray.start_position + inv_det * t * ray.direction;
  collision_1.distance = length(ray.start_position - collision_1.position);

  if (closest_collision_distance < collision_1.distance) return -1.0;

  collision_1.material_index = triangle.material_index;

  u = u * inv_det;
  v = v * inv_det;
  collision_1.uv = (1.0 - u - v) * triangle.uv0 + u * triangle.uv1 + v * triangle.uv2;
  collision_1.normal = (1.0 - u - v) * triangle.n0 + u * triangle.n1 + v * triangle.n2;

  return 1.0;
}

// BBOX
bool pointInsideBox(vec3 bottom, vec3 top, vec3 point) {
  return (bottom.x < point.x && bottom.y < point.y && bottom.z < point.z && top.x > point.x && top.y > point.y && top.z > point.z);
}

float boundingBoxCollision_0(vec3 bottom, vec3 top, Ray r) {
  vec3 dirfrac = vec3(1,1,1) / r.direction;

  vec3 t1 = (bottom - r.start_position) * dirfrac;
  vec3 t2 = (top - r.start_position) * dirfrac;

  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));
  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));

  return (tmax < 0.0 || tmin > tmax) ? 10000.0 : tmin;
}

// Scene

void getObjectAtIndex(int index, inout Object object_0) {
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

  object_0 = Object(bottom_bbox, top_bbox, position, scale, bvh_start_index, triangle_start_index);
}

float boundingBoxCollision_1(vec3 bottom, vec3 top, Ray r) {
  vec3 dirfrac = vec3(1,1,1) / r.direction;

  vec3 t1 = (bottom - r.start_position) * dirfrac;
  vec3 t2 = (top - r.start_position) * dirfrac;

  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));
  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));

  return (tmax < 0.0 || tmin > tmax) ? 10000.0 : tmin;
}

struct BVHNode {
  vec3 bottom_bbox;
  vec3 top_bbox;
  float is_leaf;
  float distance;
  float extra_data1;
  float extra_data2;
  float node_index;
  float parent_index;
  float sibling_index;
};

void getNodeData(float index, float start_index, Ray ray, inout BVHNode node_0) {
  vec2 start_sample = SAMPLE_STEP_2048 * (index + start_index) * 4.0;

  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);
  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);
  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);
  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);

  node_0.bottom_bbox = vec3(texture(u_objects_bvh_texture, sample1));
  node_0.top_bbox = vec3(texture(u_objects_bvh_texture, sample2));

  vec3 extra_data1 = vec3(texture(u_objects_bvh_texture, sample3));
  node_0.is_leaf = extra_data1.x;
  node_0.extra_data1 = extra_data1.y;
  node_0.extra_data2 = extra_data1.z;

  vec3 extra_data2 = vec3(texture(u_objects_bvh_texture, sample4));
  node_0.parent_index = extra_data2.x;
  node_0.sibling_index = extra_data2.y;

//  node.distance = boundingBoxCollision(node.bottom_bbox, node.top_bbox, ray, node.is_leaf);

  node_0.node_index = index;
}

void processLeaf(BVHNode node, inout Collision closest_collision_2442302364, Ray ray, float triangle_start_index_2442302364, Object object_1) {
  float triangle_count_2442302364 = node.extra_data1;
  float start_triangle_index = node.extra_data2 + triangle_start_index_2442302364;

  float current_index = start_triangle_index;
  float end_index = start_triangle_index + triangle_count_2442302364;

  Collision collision;
  for (float idx = 0.0; idx < triangle_count_2442302364; idx++) {
    Triangle triangle = GetTriangleFromIndex(getTriangleIndex(start_triangle_index + idx));

    if (triangleIntersection(ray, triangle, object_1.position, collision, closest_collision_2442302364.distance) == 1.0) {
      closest_collision_2442302364 = collision;
    }
  }
}

void traverseObjectTree(Ray ray, inout Collision closest_collision_2442302364, Object object) {
  float start_index_2442302364 = object.object_bvh_start_index;
  float triangle_start_index = object.triangle_start_index;

  Collision collision;
  BVHNode node;
  BVHNode left_node;
  BVHNode right_node;

  //float stack[32];
  float[] stack = float[] (.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0,.0);
  int stackIdx = 1;

  for (int i = 0; i < 100; i++) {
    if (stackIdx < 1) return;

    float box_index = stack[--stackIdx];

    // Fetch node data
    getNodeData(box_index, start_index_2442302364, ray, node);

    if (node.is_leaf == 0.0) {
      // Check collision with bounding box
      float collision_distance = 0.0;

      getNodeData(node.extra_data1, start_index_2442302364, ray, left_node);
      getNodeData(node.extra_data2, start_index_2442302364, ray, right_node);

      left_node.distance = boundingBoxCollision_1(left_node.bottom_bbox + object.position, left_node.top_bbox + object.position, ray);
      right_node.distance = boundingBoxCollision_1(right_node.bottom_bbox + object.position, right_node.top_bbox + object.position, ray);

      float near_distance = min(left_node.distance, right_node.distance);
      float far_distance = max(left_node.distance, right_node.distance);

      float mixer = clamp(step(right_node.distance, left_node.distance), 0.0, 1.0);
      float near_child = mix(node.extra_data1, node.extra_data2, mixer);
      float far_child = mix(node.extra_data2, node.extra_data1, mixer);

      if (far_distance < closest_collision_2442302364.distance) {
        stack[stackIdx++] = far_child; // Set left child index: extra_data1 = left index
        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index
      }
      else if (near_distance < closest_collision_2442302364.distance) {
        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index
      }

      // Return if stack index exceeds stack size
      if (stackIdx > 31) return;
    }
    else {
      processLeaf(node, closest_collision_2442302364, ray, triangle_start_index, object);
    }
  }
}

bool sceneIntersection(Ray ray, inout Collision collision_0) {
  Collision closest_collision;
  closest_collision.distance = 1000.0;

  Object object;
  int collision_count = 0;
  for (int i = 0; i < object_count; i++) {
    getObjectAtIndex(i, object);

    float collision_distance = boundingBoxCollision_0(object.bounding_bottom + object.position, object.bounding_top + object.position, ray);

    if (collision_distance < closest_collision.distance) {
      traverseObjectTree(ray, closest_collision, object);
    }
  }

  if (closest_collision.distance == 10000.0) {
    return false;
  }
  else {
    collision_0 = closest_collision;
    return true;
  }
}

vec3 pathTrace(Ray ray) {
  vec3 mask = vec3(1,1,1);
  vec3 accumulated_color = vec3(0,0,0);
  Collision collision;
  Material collision_material;

  for (float iteration = 0.0; iteration < float(trace_depth); iteration++) {
    float distribution = 1.0;

    if (!sceneIntersection(ray, collision)) {
      if (global_lightning_enabled == 1.0) {
        vec3 lightSphereColor = lightSphereContribution(ray);
        if (iteration == 0.0) {
          return vec3(0); //(lightSphereContribution - 0.5) * 1.5 + 0.5;
        }
        else {
          lightSphereColor = vec3(0,0,0); //((lightSphereContribution - 0.5) * 2.5 + 0.5) * 0.8;
          accumulated_color += (mask * lightSphereColor);
        }
      }
      return accumulated_color;
    }

    collision_material = getMaterial(collision.material_index);

    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);
    mask *= BRDF(ray, collision_material, collision.uv, collision.normal, next_dir) * distribution;
    //mask *= 2.0;

    accumulated_color += mask * collision_material.emission_rate;

    if (collision_material.emission_rate != 0.0)  return accumulated_color;;

    ray = Ray(collision.position + next_dir * EPS, next_dir);
  }

  return accumulated_color;
}

void main( void ) {
    vec3 traceColor = vec3(0,0,0);
    Ray ray = createRay(gl_FragCoord.xy, 0);
    traceColor += pathTrace(ray);

    vec3 texture = texture(u_accumulated_texture, v_texCoord).rgb;

    vec3 mixedTraceColor = mix(traceColor, texture, samples / (samples + 1.0));
    outColor = vec4(mixedTraceColor, 1.0);
}