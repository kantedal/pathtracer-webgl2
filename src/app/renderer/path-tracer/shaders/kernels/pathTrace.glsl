#pragma glslify: Ray = require("./ray/Ray.glsl")
#pragma glslify: Material = require("./material/Material.glsl")
#pragma glslify: lightSphereContribution = require("./light-sphere/lightSphereContribution.glsl", texture=texture, u_dome_texture=u_dome_texture)
#pragma glslify: distanceEstimator = require("./fractal/distanceEstimator.glsl", Power=u_power, Bailout=u_bailout)
#pragma glslify: calculateNormal = require("./fractal/calculateNormal.glsl", minDistance=minDistance, Power=u_power, Bailout=u_bailout)

bool rayMarch(Ray ray, inout Collision collision) {
  float maxSteps = 500.0;

  float totalDistance = 0.0;
  float steps;
  vec3 p;
  for (steps = 0.0; steps < maxSteps; steps++) {
    p = ray.start_position + totalDistance * ray.direction;
    float distance = distanceEstimator(p);
    totalDistance += distance;

    if (distance < minDistance) {
      collision.position = p;
      collision.normal = calculateNormal(p);
      return true;
    }
  }

  return false;
}

vec3 pathTrace(Ray ray) {
  vec3 mask = vec3(1,1,1);
  vec3 accumulated_color = vec3(0,0,0);
  Collision collision;
  Material collision_material = Material(vec3(0.8), 5, 0.0, 1.0, 1.0);

  for (float iteration = 0.0; iteration < 3.0; iteration++) {
    float distribution = 1.0;

    if (!rayMarch(ray, collision)) {

      if (iteration == 0.0) {
        return vec3(0.5); //(lightSphereContribution - 0.5) * 1.5 + 0.5;
      }
      else {
        vec3 lightSphereColor = lightSphereContribution(ray);
        accumulated_color += (mask * ((lightSphereColor - 0.5) * 3.5 + 0.5) * 0.8);
        //accumulated_color += (mask * lightSphereColor);
      }
      return accumulated_color;
    }

    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);
    mask *= BRDF(ray, collision_material, collision.uv, collision.normal, next_dir) * distribution;

    ray = Ray(collision.position + next_dir * 0.001, next_dir);
  }

  return accumulated_color;


//  if (rayMarch(ray, collision)) {
//    return dot(-ray.direction, collision.normal) * vec3(0.8);
//  }
//  else {
//    return vec3(0.2);
//  }
  //return vec3(1.0 - steps / maxSteps);
}


#pragma glslify: export(pathTrace)