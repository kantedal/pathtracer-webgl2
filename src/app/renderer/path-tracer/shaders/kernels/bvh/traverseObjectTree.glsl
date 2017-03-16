#pragma glslify: Ray = require("../ray/Ray.glsl")
#pragma glslify: getSample = require("../helpers/getSample.glsl")
#pragma glslify: boundingBoxCollision = require("../bbox/boundingBoxCollision.glsl", Ray=Ray)

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

void getNodeData(float index, float start_index, Ray ray, inout BVHNode node) {
  vec2 start_sample = SAMPLE_STEP_2048 * (index + start_index) * 4.0;

  vec2 sample1 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 0.0);
  vec2 sample2 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 1.0);
  vec2 sample3 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 2.0);
  vec2 sample4 = getSample(start_sample, SAMPLE_STEP_2048, 2048.0, 3.0);

  node.bottom_bbox = vec3(texture(u_objects_bvh_texture, sample1));
  node.top_bbox = vec3(texture(u_objects_bvh_texture, sample2));

  vec3 extra_data1 = vec3(texture(u_objects_bvh_texture, sample3));
  node.is_leaf = extra_data1.x;
  node.extra_data1 = extra_data1.y;
  node.extra_data2 = extra_data1.z;

  vec3 extra_data2 = vec3(texture(u_objects_bvh_texture, sample4));
  node.parent_index = extra_data2.x;
  node.sibling_index = extra_data2.y;

//  node.distance = boundingBoxCollision(node.bottom_bbox, node.top_bbox, ray, node.is_leaf);

  node.node_index = index;
}

void processLeaf(BVHNode node, inout Collision closest_collision, Ray ray, float triangle_start_index, Object object) {
  float triangle_count = node.extra_data1;
  float start_triangle_index = node.extra_data2 + triangle_start_index;

  float current_index = start_triangle_index;
  float end_index = start_triangle_index + triangle_count;

  Collision collision;
  for (float idx = 0.0; idx < triangle_count; idx++) {
    Triangle triangle = getTriangleFromIndex(getTriangleIndex(start_triangle_index + idx));

    if (triangleIntersection(ray, triangle, object.position, collision, closest_collision.distance) == 1.0) {
      closest_collision = collision;
    }
  }
}

void traverseObjectTree(Ray ray, inout Collision closest_collision, Object object) {
  float start_index = object.object_bvh_start_index;
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
    getNodeData(box_index, start_index, ray, node);

    if (node.is_leaf == 0.0) {
      // Check collision with bounding box
      float collision_distance = 0.0;

      getNodeData(node.extra_data1, start_index, ray, left_node);
      getNodeData(node.extra_data2, start_index, ray, right_node);

      left_node.distance = boundingBoxCollision(left_node.bottom_bbox + object.position, left_node.top_bbox + object.position, ray);
      right_node.distance = boundingBoxCollision(right_node.bottom_bbox + object.position, right_node.top_bbox + object.position, ray);

      float near_distance = min(left_node.distance, right_node.distance);
      float far_distance = max(left_node.distance, right_node.distance);

      float mixer = clamp(step(right_node.distance, left_node.distance), 0.0, 1.0);
      float near_child = mix(node.extra_data1, node.extra_data2, mixer);
      float far_child = mix(node.extra_data2, node.extra_data1, mixer);

      if (far_distance < closest_collision.distance) {
        stack[stackIdx++] = far_child; // Set left child index: extra_data1 = left index
        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index
      }
      else if (near_distance < closest_collision.distance) {
        stack[stackIdx++] = near_child; // Set left child index: extra_data1 = left index
      }

      // Return if stack index exceeds stack size
      if (stackIdx > 31) return;
    }
    else {
      processLeaf(node, closest_collision, ray, triangle_start_index, object);
    }
  }
}

#pragma glslify: export(traverseObjectTree)