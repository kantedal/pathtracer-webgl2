#version 300 es
precision lowp float;

in vec2 v_texCoord;
out vec4 outColor;

// Fractal uniforms
uniform float u_fractalType;
uniform float u_power;
uniform float u_minDistance;
uniform float u_maxIterations;
uniform float u_bailout;

// Menger sponge
uniform float u_halfSpongeScale;
uniform float u_spongeScale;
uniform float u_spongeOffset;

// Material uniforms
uniform float u_materialType;
uniform vec3 u_materialColor;
uniform float u_materialExtra1;
uniform float u_materialExtra2;

// Global light uniforms
uniform float u_imageBasedLightning;
uniform vec3 u_globalLightColor;
uniform float u_fillBackgroundWithLight;
uniform float u_globalLightPower;
uniform float u_globalLightContrast;

// Render effect settings
uniform float u_fogEnabled;
uniform float u_fogDistance;
uniform vec3 u_fogColor;

// Renderer uniforms
uniform float time;
uniform float samples;
uniform int trace_depth;
uniform float global_lightning_enabled;
uniform int triangle_count;
uniform int object_count;
uniform vec2 resolution;

// Camera uniforms
uniform float u_cameraYaw;
uniform float u_cameraPitch;
uniform vec3 camera_position;
uniform vec3 camera_direction;
uniform vec3 camera_right;
uniform vec3 camera_up;

uniform sampler2D u_dome_texture;

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

#define EPS 0.00000001
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

// Ray
#pragma glslify: Ray = require("./kernels/ray/Ray.glsl")
#pragma glslify: createRay = require("./kernels/ray/createRay.glsl", pitch=u_cameraPitch, yaw=u_cameraYaw, resolution=resolution, camera_position=camera_position, camera_up=camera_up, camera_right=camera_right, camera_direction=camera_direction, time=time)
// Material
#pragma glslify: getMaterial = require("./kernels/material/getMaterial.glsl", texelFetch=texelFetch, texture=texture, materialTexture=u_material_texture)
#pragma glslify: BRDF = require("./kernels/material/BRDF.glsl")
#pragma glslify: PDF = require("./kernels/material/PDF.glsl", time=time, v_texCoord=v_texCoord)

// Triangle
#pragma glslify: getTriangleFromIndex = require("./kernels/triangle/getTriangleFromIndex.glsl", texture=texture, Triangle=Triangle, u_triangle_texture=u_triangle_texture, u_light_texture=u_light_texture);
#pragma glslify: getTriangleIndex = require("./kernels/triangle/getTriangleIndex.glsl", texture=texture, u_triangle_index_texture=u_triangle_index_texture);
#pragma glslify: triangleIntersection = require("./kernels/triangle/triangleIntersection.glsl", Triangle=Triangle, Collision=Collision, EPS=EPS);

// BBOX
#pragma glslify: pointInsideBox = require("./kernels/bbox/pointInsideBox.glsl")
#pragma glslify: boundingBoxCollision = require("./kernels/bbox/boundingBoxCollision.glsl")

// Scene
#pragma glslify: getObjectAtIndex = require("./kernels/intersectable/getObjectAtIndex.glsl", texture=texture, SAMPLE_STEP_512=SAMPLE_STEP_512, u_objects_texture=u_objects_texture, Object=Object)
#pragma glslify: traverseObjectTree = require("./kernels/bvh/traverseObjectTree.glsl", texelFetch=texelFetch, texture=texture, u_objects_bvh_texture=u_objects_bvh_texture, getTriangleIndex=getTriangleIndex, triangleIntersection=triangleIntersection, getTriangleFromIndex=getTriangleFromIndex, Triangle=Triangle, BVHNode=BVHNode, Object=Object, Collision=Collision, SAMPLE_STEP_2048=SAMPLE_STEP_2048))
#pragma glslify: rayTrace = require("./kernels/rayTrace.glsl", EPS=EPS, traverseObjectTree=traverseObjectTree, getObjectAtIndex=getObjectAtIndex, Object=Object, object_count=object_count, fillBackgroundWithLight=u_fillBackgroundWithLight, globalLightColor=u_globalLightColor, imageBasedLightning=u_imageBasedLightning, materialExtra1=u_materialExtra1, materialExtra2=u_materialExtra2, fractalType=u_fractalType, fogEnabled=u_fogEnabled, fogDistance=u_fogDistance, fogColor=u_fogColor, globalLightContrast=u_globalLightContrast, spongeOffset=u_spongeOffset, spongeScale=u_spongeScale, halfSpongeScale=u_halfSpongeScale, globalLightPower=u_globalLightPower, materialColor=u_materialColor, materialType=u_materialType, maxIterations=u_maxIterations, texture=texture, u_dome_texture=u_dome_texture, minDistance=u_minDistance, u_bailout=u_bailout, u_power=u_power, global_lightning_enabled=global_lightning_enabled, trace_depth=trace_depth, sceneIntersection=sceneIntersection, lightSphereContribution=lightSphereContribution, getMaterial=getMaterial, Collision=Collision, BRDF=BRDF, PDF=PDF)

void main( void ) {
  vec3 traceColor = vec3(0,0,0);
  Ray ray = createRay(gl_FragCoord.xy, 0);
  traceColor += rayTrace(ray);

  vec3 texture = texture(u_accumulated_texture, v_texCoord).rgb;

  vec3 mixedTraceColor = mix(traceColor, texture, samples / (samples + 1.0));
  outColor = vec4(mixedTraceColor, 1.0);
}
