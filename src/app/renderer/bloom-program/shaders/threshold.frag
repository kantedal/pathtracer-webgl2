#version 300 es
precision mediump float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_buffer_texture;

void main() {
	vec3 color = vec3(texture(u_buffer_texture, v_texCoord));

  float bloomThreshold = 0.7;
  if (color.r < bloomThreshold) color.r = 0.0;
  if (color.g < bloomThreshold) color.g = 0.0;
  if (color.b < bloomThreshold) color.b = 0.0;

  outColor = vec4(color, 1.0);
}
