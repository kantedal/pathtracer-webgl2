float getStackValue(float index, float stack[32]) {
  if (index < 16.0) {
    if (index < 8.0) {
      if (index < 4.0) {
        if (index < 2.0) {
          if (index == 0.0) return stack[0];
          else return stack[1];
        }
        else {
          if (index == 2.0) return stack[2];
          else return stack[3];
        }
      }
      else {
        if (index < 6.0) {
          if (index == 4.0) return stack[4];
          else return stack[5];
        }
        else {
          if (index == 6.0) return stack[6];
          else return stack[7];
        }
      }
    }
    else {
      if (index < 12.0) {
        if (index < 10.0) {
          if (index == 8.0) return stack[8];
          else return stack[9];
        }
        else {
          if (index == 10.0) return stack[10];
          else return stack[11];
        }
      }
      else {
        if (index < 14.0) {
          if (index == 12.0) return stack[12];
          else return stack[13];
        }
        else {
           if (index == 14.0) return stack[14];
           else return stack[15];
        }
      }
    }
  }
  else {
    if (index < 24.0) {
      if (index < 20.0) {
        if (index < 18.0) {
          if (index == 16.0) return stack[16];
          else return stack[17];
        }
        else {
          if (index == 18.0) return stack[18];
          else return stack[19];
        }
      }
      else {
        if (index < 22.0) {
          if (index == 20.0) return stack[20];
          else return stack[21];
        }
        else {
          if (index == 22.0) return stack[22];
          else return stack[23];
        }
      }
    }
    else {
      if (index < 28.0) {
        if (index < 26.0) {
          if (index == 24.0) return stack[24];
          else return stack[25];
        }
        else {
          if (index == 26.0) return stack[26];
          else return stack[27];
        }
      }
      else {
        if (index < 30.0) {
          if (index == 28.0) return stack[28];
          else return stack[29];
        }
        else {
          if (index == 30.0) return stack[30];
          else return stack[31];
        }
      }
    }
  }
}

#pragma glslify: export(getStackValue)