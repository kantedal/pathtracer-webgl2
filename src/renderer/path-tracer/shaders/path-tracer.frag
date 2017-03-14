#version 300 es
precision highp float;

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

struct Ray {
  vec3 start_position;
  vec3 direction;
};

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

struct Material {
  vec3 color;
  int material_type;
  float emission_rate;
  float material_parameter1;
  float material_parameter2;
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

struct BBoxCollision {
  float collision_distance;
  Object object;
};

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

#pragma glslify: getSample = require("./kernels/helpers/getSample.glsl")
#pragma glslify: random = require("./kernels/helpers/random.glsl")

// Ray
#pragma glslify: createRay = require("./kernels/ray/createRay.glsl", camera_position=camera_position, camera_up=camera_up, camera_right=camera_right, camera_direction=camera_direction, time=time, Ray=Ray)
#pragma glslify: lightSphereContribution = require("./kernels/light-sphere/lightSphereContribution.glsl", texture=texture, lightSphereTexture=u_light_sphere_texture, Ray=Ray))

// Material
#pragma glslify: getMaterial = require("./kernels/material/getMaterial.glsl", Material=Material, getSample=getSample, texture=texture, materialTexture=u_material_texture)
#pragma glslify: BRDF = require("./kernels/material/BRDF.glsl", Material=Material, Ray=Ray)
#pragma glslify: PDF = require("./kernels/material/PDF.glsl", Material=Material, Ray=Ray, time=time)

// Triangle
#pragma glslify: getTriangleFromIndex = require("./kernels/triangle/getTriangleFromIndex.glsl", texture=texture, Triangle=Triangle, u_triangle_texture=u_triangle_texture, u_light_texture=u_light_texture);
#pragma glslify: getTriangleIndex = require("./kernels/triangle/getTriangleIndex.glsl", texture=texture, u_triangle_index_texture=u_triangle_index_texture);
#pragma glslify: triangleIntersection = require("./kernels/triangle/triangleIntersection.glsl", Ray=Ray, Triangle=Triangle, Collision=Collision, EPS=EPS);

// BBOX
#pragma glslify: pointInsideBox = require("./kernels/bbox/pointInsideBox.glsl")
#pragma glslify: boundingBoxCollision = require("./kernels/bbox/boundingBoxCollision.glsl", Ray=Ray)

// Intersectable
#pragma glslify: getObjectAtIndex = require("./kernels/intersectable/getObjectAtIndex.glsl", texture=texture, SAMPLE_STEP_512=SAMPLE_STEP_512, u_objects_texture=u_objects_texture, Object=Object)

// BVH
#pragma glslify: traverseObjectTree = require("./kernels/bvh/traverseObjectTree.glsl", texture=texture, u_objects_bvh_texture=u_objects_bvh_texture, getTriangleIndex=getTriangleIndex, triangleIntersection=triangleIntersection, getTriangleFromIndex=getTriangleFromIndex, Triangle=Triangle, BVHNode=BVHNode, Ray=Ray, Object=Object, Collision=Collision, SAMPLE_STEP_2048=SAMPLE_STEP_2048)

// Scene
#pragma glslify: sceneIntersection = require("./kernels/scene/sceneIntersection.glsl", object_count=object_count, getObjectAtIndex=getObjectAtIndex, traverseObjectTree=traverseObjectTree, Object=Object, Collision=Collision, Ray=Ray)


/*
 RAYTRACER.GLSL
*/

vec3 PathTrace(Ray ray) {
  vec3 mask = vec3(1,1,1);
  vec3 accumulated_color = vec3(0,0,0);
  Collision collision;
  Material collision_material;

  for (int iteration = 0; iteration < 10; iteration++) {
    float distribution = 1.0;

    if (!sceneIntersection(ray, collision)) {
      //if (global_lightning_enabled == 1.0) {
        vec3 lightSphereColor = lightSphereContribution(ray);
        if (iteration == 0) {
          return vec3(0); //(lightSphereContribution - 0.5) * 1.5 + 0.5;
        }
        else {
          lightSphereColor = vec3(0,0,0); //((lightSphereContribution - 0.5) * 2.5 + 0.5) * 0.8;
          accumulated_color += (mask * lightSphereColor);
        }

      //}
      break;
    }

    collision_material = getMaterial(collision.material_index);

    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);
    mask *= BRDF(ray, collision_material, collision.uv, collision.normal, next_dir) * distribution;
    //mask *= 2.0;

    accumulated_color += mask * collision_material.emission_rate;

    if (collision_material.emission_rate != 0.0) break;

    if (iteration == trace_depth - 1) {
      break;
    }
    else {
      ray = Ray(collision.position + next_dir * EPS, next_dir);
    }
  }

  return accumulated_color;
}



void main( void ) {
    vec3 traceColor = vec3(0,0,0);
    Ray ray = createRay(v_texCoord * 512.0, 0);
    traceColor += PathTrace(ray);

    vec3 texture = texture(u_accumulated_texture, v_texCoord).rgb;

    vec3 mixedTraceColor = mix(traceColor, texture, samples / (samples + 1.0));
    outColor = vec4(mixedTraceColor, 1.0);
}