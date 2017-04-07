#pragma glslify: Ray = require("../ray/Ray.glsl")
#pragma glslify: boundingBoxCollision = require("../bbox/boundingBoxCollision.glsl")

bool sceneIntersection(Ray ray, inout Collision collision) {
  Collision closest_collision;
  closest_collision.distance = 10000.0;

  Object object;
  int collision_count = 0;
  for (int i = 0; i < object_count; i++) {
    getObjectAtIndex(i, object);

    float collision_distance = boundingBoxCollision(object.bounding_bottom + object.position, object.bounding_top + object.position, ray);

    if (collision_distance < closest_collision.distance) {
      traverseObjectTree(ray, closest_collision, object);
    }
  }

  if (closest_collision.distance == 10000.0) {
    return false;
  }
  else {
    collision = closest_collision;
    return true;
  }
}

#pragma glslify: export(sceneIntersection)