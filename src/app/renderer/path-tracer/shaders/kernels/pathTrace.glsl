#pragma glslify: Ray = require("./ray/Ray.glsl")
#pragma glslify: Material = require("./material/Material.glsl")

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


#pragma glslify: export(pathTrace)