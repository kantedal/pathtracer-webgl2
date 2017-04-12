#pragma glslify: Ray = require("./ray/Ray.glsl")
#pragma glslify: Material = require("./material/Material.glsl")
#pragma glslify: lightSphereContribution = require("./light-sphere/lightSphereContribution.glsl", texture=texture, u_dome_texture=u_dome_texture)
#pragma glslify: sceneIntersection = require("./scene/sceneIntersection.glsl", traverseObjectTree=traverseObjectTree, getObjectAtIndex=getObjectAtIndex, Object=Object, object_count=object_count)

vec3 applyFog(vec3 color, float distance) {
  float fogAmount = 1.0 - exp( -distance * fogDistance * 0.2 );
  return mix(color, fogColor, fogAmount);
}

vec3 pathTrace(Ray ray) {
  vec3 mask = vec3(1,1,1);
  float fogDistance = 0.0;
  vec3 accumulated_color = vec3(0,0,0);
  Collision collision;
  Material collision_material;

  for (float iteration = 0.0; iteration < float(trace_depth); iteration++) {
    float distribution = 1.0;

    if (!sceneIntersection(ray, collision)) {
      vec3 lightSphereColor = mix(globalLightColor, lightSphereContribution(ray), imageBasedLightning);
      if (iteration == 0.0) {
        return mix(fogColor, lightSphereColor, fillBackgroundWithLight);
      }
      else {
        float lightPower = (globalLightPower - 0.5) * globalLightContrast + 0.5;
        accumulated_color += mask * lightSphereColor * lightPower;
        return applyFog(accumulated_color, fogDistance);
      }
    }

    collision_material = getMaterial(collision.material_index);

    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);
    mask *= BRDF(ray, collision_material, collision.uv, collision.normal, next_dir) * distribution;
    //mask *= 2.0;

    accumulated_color += mask * collision_material.emission_rate;

    float collisionDistance = length(ray.start_position - collision.position);
    if (iteration == 0.0 && fogEnabled == 1.0) {
      fogDistance = collisionDistance; //clamp(collisionDistance / fogDistance, 0.0, 1.0);
    }

    if (collision_material.emission_rate != 0.0) return applyFog(accumulated_color, fogDistance);

    ray = Ray(collision.position + next_dir * EPS, next_dir);
  }

  return applyFog(accumulated_color, fogDistance);
}


#pragma glslify: export(pathTrace)