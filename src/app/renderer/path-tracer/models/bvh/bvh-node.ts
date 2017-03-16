import Ray from "../ray";
import Triangle from "../primitives/triangle";

export class BVHNode {
  private _bottom: GLM.IArray;
  private _top: GLM.IArray;
  private _nodeIndex: number;

  constructor() {
    this._bottom = vec3.fromValues(0,0,0);
    this._top = vec3.fromValues(0,0,0);
  }

  public isLeaf(): boolean {
    return false;
  }

  public rayIntersection(ray: Ray): boolean {
    let tmin = (this._bottom[0] - ray.startPosition[0]) / ray.direction[0];
    let tmax = (this._top[0] - ray.startPosition[0]) / ray.direction[0];

    if (tmin > tmax) {
      let temp = tmin;
      tmin = tmax;
      tmax = temp;
    }

    let tymin = (this._bottom[1] - ray.startPosition[1]) / ray.direction[1];
    let tymax = (this._top[1] - ray.startPosition[1]) / ray.direction[1];

    if (tymin > tymax) {
      let temp = tymin;
      tymin = tymax;
      tymax = temp;
    }

    if ((tmin > tymax) || (tymin > tmax))
      return false;

    if (tymin > tmin)
      tmin = tymin;

    if (tymax < tmax)
      tmax = tymax;

    let tzmin = (this._bottom[2] - ray.startPosition[2]) / ray.direction[2];
    let tzmax = (this._top[2] - ray.startPosition[2]) / ray.direction[2];

    if (tzmin > tzmax) {
      let temp = tzmin;
      tzmin = tzmax;
      tzmax = temp;
    }

    if ((tmin > tzmax) || (tzmin > tmax))
      return false;

    return true;
  }

  get bottom(): GLM.IArray { return this._bottom; }
  set bottom(value: GLM.IArray) { this._bottom = value; }
  get top(): GLM.IArray { return this._top; }
  set top(value: GLM.IArray) { this._top = value; }
  get nodeIndex(): number { return this._nodeIndex; }
  set nodeIndex(value: number) { this._nodeIndex = value; }
}


export class BVHInner extends BVHNode {
  private _left: BVHNode;
  private _right: BVHNode;

  constructor() {
    super();
  }

  public isLeaf(): boolean {
    return false;
  }

  get right(): BVHNode { return this._right; }
  set right(value: BVHNode) { this._right = value; }
  get left(): BVHNode { return this._left; }
  set left(value: BVHNode) { this._left = value; }
}

export class BVHLeaf extends BVHNode {
  private _triangles: Array<Triangle>;

  constructor() {
    super();
    this._triangles = [];
  }

  public isLeaf() {
    return true;
  }

  get triangles(): Array<Triangle> { return this._triangles; }
  set triangles(value: Array<Triangle>) { this._triangles = value; }
}
