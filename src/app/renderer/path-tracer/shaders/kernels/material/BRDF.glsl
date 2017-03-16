#pragma glslify: Ray = require("../ray/Ray.glsl")
#pragma glslify: Material = require("./Material.glsl")

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

#pragma glslify: export(BRDF)