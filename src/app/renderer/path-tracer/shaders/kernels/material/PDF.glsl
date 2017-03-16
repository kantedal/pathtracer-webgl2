#pragma glslify: Material = require("./Material.glsl")
#pragma glslify: random = require("glsl-random")
#pragma glslify: Ray = require("../ray/Ray.glsl")

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

#pragma glslify: export(PDF)