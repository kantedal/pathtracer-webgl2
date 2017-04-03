#version 300 es
precision mediump float;

in vec2 a_texCoord;
in vec4 a_position;

out vec2 v_texCoord;

void main() {
  v_texCoord = a_texCoord;
}