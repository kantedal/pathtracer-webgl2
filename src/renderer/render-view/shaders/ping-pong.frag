#version 300 es
precision highp float;

#pragma glslify: testFunction = require("./test-module.glsl")

in vec2 v_texCoord;
out vec4 outColor;

uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_last_texture;

void main() {
    vec2 norm_mouse = u_mouse / vec2(512, 512);
    norm_mouse = vec2(norm_mouse.x, 1.0 - norm_mouse.y);

    float distance = 1.0 - clamp(length(norm_mouse - v_texCoord), 0.0, 0.07) / 0.065;

    vec3 color = texture(u_last_texture, v_texCoord).xyz;
    vec3 newColor = (vec3(distance) + color) * vec3(0.98, 0.94, 0.9);

    //outColor = vec4(newColor, 1.0);
    outColor = vec4(vec3(testFunction(), 0.0, 0.0), 1.0);
}