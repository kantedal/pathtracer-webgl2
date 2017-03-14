#pragma glslify: boundingBoxCollision = require("../bbox/boundingBoxCollision.glsl", Ray=Ray)

bool sceneIntersection(in Ray ray, inout Collision collision) {
  Collision closest_collision;
  closest_collision.distance = 1000.0;

  Object object;
  int collision_count = 0;
  for (int i = 0; i < 1000; i++) {
    getObjectAtIndex(i, object);

    float collision_distance = boundingBoxCollision(object.bounding_bottom + object.position, object.bounding_top + object.position, ray, 0.0);

    if (collision_distance < closest_collision.distance) {
      traverseObjectTree(ray, closest_collision, object);
    }

    if (i >= object_count) break;
  }

  if (closest_collision.distance == 1000.0) {
    return false;
  }
  else {
    collision = closest_collision;
    return true;
  }
}

#pragma glslify: export(sceneIntersection)