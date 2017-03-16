vec2 getSample(vec2 start_sample, vec2 sample_step, float resolution, float steps) {
  float s = start_sample.x + steps * sample_step.x;
  return vec2(fract(s), floor(s) / resolution);
}

#pragma glslify: export(getSample)