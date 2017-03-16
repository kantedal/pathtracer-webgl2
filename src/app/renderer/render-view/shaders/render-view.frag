#version 300 es
precision mediump float;

#pragma glslify: random = require("glsl-random")

in vec2 v_texCoord;
out vec4 outColor;

uniform float u_time;
uniform float u_zoom;
uniform vec2 u_rendererResolution;
uniform vec2 u_resolution;
uniform vec2 u_mousePosition;
uniform sampler2D u_texture;

float distanceToBox(vec2 rendererResolution) {
  vec2 min = (vec2(1.0) - rendererResolution / u_resolution) / 2.0 * u_resolution;
  vec2 max = ((vec2(1.0) - rendererResolution / u_resolution) / 2.0 + rendererResolution / u_resolution) * u_resolution;
  vec2 closestPos = clamp(gl_FragCoord.xy, min, max);

  vec2 toBox = (closestPos - gl_FragCoord.xy);
  return pow(abs(length(toBox)) / 500.0, 0.55 + 0.1 * sin(3.0 * u_time));
}

float boundingBoxCollision3d(vec3 origin, vec3 direction, vec2 rendererResolution) {
  vec2 bottom2d = (vec2(1.0) - rendererResolution / u_resolution) / 2.0 * u_resolution;
  vec2 top2d = ((vec2(1.0) - rendererResolution / u_resolution) / 2.0 + rendererResolution / u_resolution) * u_resolution;

  vec3 bottom = vec3(bottom2d.x, bottom2d.y, 0.1);
  vec3 top = vec3(top2d.x, top2d.y, 0.2);

  vec3 dirfrac = vec3(1,1,1) / direction;

  vec3 t1 = (bottom - origin) * dirfrac;
  vec3 t2 = (top - origin) * dirfrac;

  float tmin = max(max(min(t1.x, t2.x), min(t1.y, t2.y)), min(t1.z, t2.z));
  float tmax = min(min(max(t1.x, t2.x), max(t1.y, t2.y)), max(t1.z, t2.z));

  if (tmax < 0.0 || tmin > tmax) return 10000.0;

  return tmin;
}

void main() {
  vec3 mousePosition = vec3(u_mousePosition.x, u_resolution.y - u_mousePosition.y, 3.0);
  vec3 backgroundPosition = vec3(gl_FragCoord.x, gl_FragCoord.y, 0.0);

  vec3 background;
  vec2 rendererResolution = u_rendererResolution * u_zoom;

  vec2 rendererScale = (u_resolution / rendererResolution);
  vec2 rendererOffset = (vec2(1.0) - rendererScale) / 2.0;
  vec2 rendererSamplePosition = rendererOffset + v_texCoord * rendererScale;
  vec3 rendererColor = texture(u_texture, rendererSamplePosition).xyz;

  if (rendererSamplePosition.x > 1.0 || rendererSamplePosition.x < 0.0 || rendererSamplePosition.y > 1.0 || rendererSamplePosition.y < 0.0) {
    float boxDistance = distanceToBox(rendererResolution);
    float lightDistance = abs(length(backgroundPosition - mousePosition));

    float lightIntesity = 1.0 - clamp(pow(lightDistance / 1500.0, 2.0), 0.0, 1.0);

    vec3 toLight = normalize(mousePosition - backgroundPosition);
    float distanceToBox = boundingBoxCollision3d(backgroundPosition, toLight, rendererResolution);

    if (distanceToBox != 10000.0 && lightDistance > distanceToBox) {
      lightIntesity *= clamp(pow(distanceToBox / 30.0, 1.0), 0.0, 1.0);
    }

    background = (0.2 * lightIntesity + 0.8) * (0.15 + boxDistance) * vec3(0.15 + 0.5 * (1.0 - length(vec2(0.5) - v_texCoord)));
  }
  else {
    background = rendererColor;
  }
  outColor = vec4(background, 1.0);
}