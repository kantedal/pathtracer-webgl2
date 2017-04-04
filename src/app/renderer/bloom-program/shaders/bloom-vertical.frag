#version 300 es
precision mediump float;

in vec2 v_texCoord;
out vec4 outColor;

uniform vec2 u_resolution;
uniform sampler2D u_buffer_texture;

void main() {
  float offset[5];
  offset[0] = -2.0;
  offset[1] = -1.0;
  offset[2] = 0.0;
  offset[3] = 1.0;
  offset[4] = 2.0;

  float weightInverse[5];
  weightInverse[0] = 0.0625;
  weightInverse[1] = 0.25;
  weightInverse[2] = 0.375;
  weightInverse[3] = 0.25;
  weightInverse[4] = 0.0625;
  vec3 color = vec3(0.0, 0.0, 0.0);

  for (int x = 0; x < 5; x++) {
    color += vec3(texture(u_buffer_texture, v_texCoord + vec2(0.0, offset[x] / u_resolution.y))) * weightInverse[x];
  }

	outColor = vec4(color, 1.0);
 }
