#pragma glslify: getSample = require(../helpers/getSample.glsl)
#pragma glslify: getStackValue = require(../helpers/getStackValue.glsl)
#pragma glslify: setStackIndex = require(../helpers/setStackIndex.glsl)
#pragma glslify: boundingBoxCollision = require("../bbox/boundingBoxCollision.glsl", Ray=Ray)

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
  for (int idx = 0; idx < 1000; idx++) {
    Triangle triangle = getTriangleFromIndex(getTriangleIndex(current_index));

    if (triangleIntersection(ray, triangle, object.position, collision, closest_collision.distance) == 1.0) {
      closest_collision = collision;
    }

    if (++current_index >= end_index) break;
  }
}

void traverseObjectTree(Ray ray, inout Collision closest_collision, Object object) {
  float start_index = object.object_bvh_start_index;
  float triangle_start_index = object.triangle_start_index;

  Collision collision;
  BVHNode node;
  BVHNode left_node;
  BVHNode right_node;

  float stack[32];
  float stackIdx = 0.0;
  stack[0] = 0.0;
  stackIdx++;

  for (int i = 0; i < 100; i++) {
    if (stackIdx < 1.0) break;
    float box_index = getStackValue(--stackIdx, stack);

    // Fetch node data
    getNodeData(box_index, start_index, ray, node);

    if (node.is_leaf == 0.0) {
      // Check collision with bounding box
      float collision_distance = 0.0;

      getNodeData(node.extra_data1, start_index, ray, left_node);
      getNodeData(node.extra_data2, start_index, ray, right_node);

      left_node.distance = boundingBoxCollision(left_node.bottom_bbox + object.position, left_node.top_bbox + object.position, ray, left_node.is_leaf);
      right_node.distance = boundingBoxCollision(right_node.bottom_bbox + object.position, right_node.top_bbox + object.position, ray, right_node.is_leaf);

      float near_distance = min(left_node.distance, right_node.distance);
      float far_distance = max(left_node.distance, right_node.distance);

      float mixer = clamp(step(right_node.distance, left_node.distance), 0.0, 1.0);
      float near_child = mix(node.extra_data1, node.extra_data2, mixer);
      float far_child = mix(node.extra_data2, node.extra_data1, mixer);

      if (far_distance < closest_collision.distance) {
        setStackIndex(stackIdx++, far_child, stack); // Set left child index: extra_data1 = left index
        setStackIndex(stackIdx++, near_child , stack); // Set left child index: extra_data1 = left index
      }
      else if (near_distance < closest_collision.distance) {
        setStackIndex(stackIdx++, near_child , stack); // Set left child index: extra_data1 = left index
      }

      // Return if stack index exceeds stack size
      if (stackIdx > 31.0) return;
    }
    else {
      processLeaf(node, closest_collision, ray, triangle_start_index, object);
    }
  }
}

#pragma glslify: export(traverseObjectTree)