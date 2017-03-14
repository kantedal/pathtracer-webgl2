#version 300 es
precision mediump float;

in vec2 v_texCoord;
out vec4 outColor;

uniform float u_time;
uniform sampler2D u_texture;

void main() {
    vec3 color = texture(u_texture, v_texCoord).xyz;
    outColor = vec4(color, 1.0);
}