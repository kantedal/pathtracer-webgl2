#version 300 es
precision mediump float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_mainTexture;
uniform sampler2D u_bloomTexture;

uniform float u_bloomEnabled;
uniform float u_bloomAlpha;

void main() {
  vec3 mainColor = texture(u_mainTexture, v_texCoord).xyz;
  vec3 bloomColor = u_bloomAlpha * mix(texture(u_bloomTexture, v_texCoord).xyz, vec3(0.0), 1.0 - u_bloomEnabled);
	outColor = vec4(mainColor + bloomColor, 1.0);
}
