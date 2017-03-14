void setStackIndex(float index, float value, inout float stack[32]) {
  if (index < 16.0) {
    if (index < 8.0) {
      if (index < 4.0) {
        if (index < 2.0) {
          if (index == 0.0) stack[0] = value;
          else stack[1] = value;
        }
        else {
          if (index == 2.0) stack[2] = value;
          else stack[3] = value;
        }
      }
      else {
        if (index < 6.0) {
          if (index == 4.0) stack[4] = value;
          else stack[5] = value;
        }
        else {
          if (index == 6.0) stack[6] = value;
          else stack[7] = value;
        }
      }
    }
    else {
      if (index < 12.0) {
        if (index < 10.0) {
          if (index == 8.0) stack[8] = value;
          else stack[9] = value;
        }
        else {
          if (index == 10.0) stack[10] = value;
          else stack[11] = value;
        }
      }
      else {
        if (index < 14.0) {
          if (index == 12.0) stack[12] = value;
          else stack[13] = value;
        }
        else {
           if (index == 14.0) stack[14] = value;
           else stack[15] = value;
        }
      }
    }
  }
  else {
    if (index < 24.0) {
      if (index < 20.0) {
        if (index < 18.0) {
          if (index == 16.0) stack[16] = value;
          else stack[17] = value;
        }
        else {
          if (index == 18.0) stack[18] = value;
          else stack[19] = value;
        }
      }
      else {
        if (index < 22.0) {
          if (index == 20.0) stack[20] = value;
          else stack[21] = value;
        }
        else {
          if (index == 22.0) stack[22] = value;
          else stack[23] = value;
        }
      }
    }
    else {
      if (index < 28.0) {
        if (index < 26.0) {
          if (index == 24.0) stack[24] = value;
          else stack[25] = value;
        }
        else {
          if (index == 26.0) stack[26] = value;
          else stack[27] = value;
        }
      }
      else {
        if (index < 30.0) {
          if (index == 28.0) stack[28] = value;
          else stack[29] = value;
        }
        else {
          if (index == 30.0) stack[30] = value;
          else stack[31] = value;
        }
      }
    }
  }
}

#pragma glslify: export(setStackIndex)
