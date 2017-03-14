import Triangle from "../primitives/triangle";
import Ray from "../ray";

export default class BoundingBox {
  private _top: GLM.IArray;
  private _bottom: GLM.IArray;
  private _center: GLM.IArray;
  private _distanceFromCamera: number;

  constructor() {
    this._top = vec3.fromValues(-10000, -10000, -10000);
    this._bottom = vec3.fromValues(10000, 10000, 10000);
    this._center = vec3.fromValues(0, 0, 0);
  }

  public calculateBoundingBoxFromTriangles(triangles: Array<Triangle>) {
    this._bottom = vec3.fromValues(10000, 10000, 10000);
    this._top = vec3.fromValues(-10000, -10000, -10000);

    for (let triangle of triangles) {
      // Set bottom of bounding box
      vec3.min(this._bottom, this._bottom, triangle.v0);
      vec3.min(this._bottom, this._bottom, triangle.v1);
      vec3.min(this._bottom, this._bottom, triangle.v2);

      // Set top of bounding box
      vec3.max(this._top, this._top, triangle.v0);
      vec3.max(this._top, this._top, triangle.v1);
      vec3.max(this._top, this._top, triangle.v2);
    }
  }

  public calculateBoundingBoxFromSphere(position: GLM.IArray, radius: number) {
    this._bottom = vec3.fromValues(position[0] - radius, position[1] - radius, position[2] - radius);
    this._top = vec3.fromValues(position[0] + radius, position[1] + radius, position[2] + radius);
  }

  public rayIntersection(ray: Ray): boolean {
    let dirfrac = vec3.fromValues(0,0,0);
    dirfrac[0] = 1.0 / ray.direction[0];
    dirfrac[1] = 1.0 / ray.direction[1];
    dirfrac[2] = 1.0 / ray.direction[2];

    // lb is the corner of AABB with minimal coordinates - left bottom, rt is maximal corner
    // r.org is origin of ray
    let t1 = (this._bottom[0] - ray.startPosition[0]) * dirfrac[0];
    let t2 = (this._top[0] - ray.startPosition[0]) * dirfrac[0];
    let t3 = (this._bottom[1] - ray.startPosition[1]) * dirfrac[1];
    let t4 = (this._top[1] - ray.startPosition[1]) * dirfrac[1];
    let t5 = (this._bottom[2] - ray.startPosition[2]) * dirfrac[2];
    let t6 = (this._top[2] - ray.startPosition[2]) * dirfrac[2];

    let tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
    let tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));

    // if tmax < 0, ray (line) is intersecting AABB, but whole AABB is behing us
    if (tmax < 0.0 || tmin > tmax) return false;

    let collision_distance = tmin;
    return true;
  }

  get center(): GLM.IArray { return this._center; }
  set center(value: GLM.IArray) { this._center = value; }
  get bottom(): GLM.IArray { return this._bottom;}
  set bottom(value: GLM.IArray) { this._bottom = value; }
  get top(): GLM.IArray { return this._top; }
  set top(value: GLM.IArray) { this._top = value; }
  get distanceFromCamera(): number { return this._distanceFromCamera; }
  set distanceFromCamera(value: number) { this._distanceFromCamera = value; }
}
