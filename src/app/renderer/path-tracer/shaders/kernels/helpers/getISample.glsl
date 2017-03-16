ivec2 getISample(float start_sample, float resolution) {
  int x = int(start_sample - resolution * floor(start_sample / resolution));
  int y = (int(start_sample) - x) / 2048;
  return ivec2(x, y);
}

#pragma glslify: export(getISample)