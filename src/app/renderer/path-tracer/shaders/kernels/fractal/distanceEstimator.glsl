// Fractal uniform

//float distanceEstimator(vec3 pos) {
//  int Iterations = 10;
//
//  vec3 z = pos;
//  float dr = 1.0;
//  float r = 0.0;
//
//  for (int i = 0; i < Iterations; i++) {
//    r = length(z);
//    if (r > 3.0)
//      break;
//
//    // Convert to polar coordinates
//    float theta = acos(z.z/r);
//    float phi = atan(z.y, z.x);
//    dr = pow(r, Power - 1.0) * Power * dr + 1.0;
//
//    // Scale and rotate the point
//    float zr = pow(r, Power);
//    theta = theta * Power;
//    phi = phi * Power;
//
//    z = zr * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));
//    z += pos;
//  }
//
//  float mandelBulbDistance = 0.5 * log(r) * r / dr;
//  return mandelBulbDistance;
//}


float distanceEstimator(vec3 w) {
  int Iterations = 10;
  vec3 offset = vec3(spongeOffset);
  float scale = spongeScale;

  w = (w * 0.5 + vec3(0.5)) * scale;  // scale [-1, 1] range to [0, 1]

  vec3 v = abs(w - halfSpongeScale) - halfSpongeScale;
  float d1 = max(v.x, max(v.y, v.z));     // distance to the box
  float d = d1;
  float p = 1.0;
  vec3 cd = v;

  for (int i = 0; i < Iterations; i++) {
    vec3 a = mod(3.0 * w * p, 3.0);
    p *= 3.0;

    v = vec3(0.5) - abs(a - vec3(1.5)) + offset;

    // distance inside the 3 axis aligned square tubes
    d1 = min(max(v.x, v.z), min(max(v.x, v.y), max(v.y, v.z))) / p;

    // intersection
    d = max(d, d1);
  }

  // The distance estimate, min distance, and fractional iteration count
  return d * 2.0;
}

//float distanceEstimator(vec3 z) {
//  int Iterations = 20;
//  float Scale = 10.0;
//
//  vec3 a1 = vec3(1,1,1);
//	vec3 a2 = vec3(-1,-1,1);
//	vec3 a3 = vec3(1,-1,-1);
//	vec3 a4 = vec3(-1,1,-1);
//	vec3 c;
//	float dist, d;
//
//  int n = 0;
//	for (n = 0; n < Iterations; n++) {
//    c = a1;
//    dist = length(z - a1);
//
//    d = length(z-a2);
//    if (d < dist) {
//      c = a2;
//      dist=d;
//    }
//
//    d = length(z-a3);
//    if (d < dist) {
//      c = a3;
//      dist=d;
//    }
//
//    d = length(z-a4);
//    if (d < dist) {
//      c = a4;
//      dist=d;
//    }
//
//		z = Scale * z - c * (Scale - 1.0);
//	}
//
//	return length(z) * pow(Scale, float(-n));
//}

//const float minRadius2 = 0.1;
//const float fixedRadius2 = 0.2;
//
//void sphereFold(inout vec3 z, inout float dz) {
//	float r2 = dot(z,z);
//	if (r2 < minRadius2) {
//		// linear inner scaling
//		float temp = (fixedRadius2 / minRadius2);
//		z *= temp;
//		dz*= temp;
//	} else if (r2 < fixedRadius2) {
//		// this is the actual sphere inversion
//		float temp = fixedRadius2 / r2;
//		z *= temp;
//		dz*= temp;
//	}
//}
//
//void boxFold(inout vec3 z, inout float dz) {
//  z = clamp(z, -1.0, 1.0) * 2.0 - z;
//}
//
//float distanceEstimator(vec3 z) {
//  int Iterations = 100;
//  float Scale = 1.0;
//
//  vec3 offset = z;
//  float dr = 1.0;
//  for (int n = 0; n < Iterations; n++) {
//    boxFold(z,dr);       // Reflect
//    sphereFold(z,dr);    // Sphere Inversion
//
//    z = Scale*z + offset;  // Scale & Translate
//    dr = dr * abs(Scale) + 1.0;
//  }
//  float r = length(z);
//  return r/abs(dr);
//}

#pragma glslify: export(distanceEstimator)