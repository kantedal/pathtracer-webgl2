import Ray from "../ray";
export default class Triangle {
  // Verices
  private _v0: GLM.IArray;
  private _v1: GLM.IArray;
  private _v2: GLM.IArray;

  // Vertex normals
  private _n0: GLM.IArray;
  private _n1: GLM.IArray;
  private _n2: GLM.IArray;

  // UV points
  private _uv0: GLM.IArray;
  private _uv1: GLM.IArray;
  private _uv2: GLM.IArray;

  private _edge1: GLM.IArray;
  private _edge2: GLM.IArray;
  private _triangleArea: number;
  private _objectIndex: number;
  private _triangleIndex: number;

  constructor(v0: GLM.IArray, v1: GLM.IArray, v2: GLM.IArray, n0: GLM.IArray, n1: GLM.IArray, n2: GLM.IArray, uv0: GLM.IArray, uv1: GLM.IArray, uv2: GLM.IArray) {
    this._v0 = v0;
    this._v1 = v1;
    this._v2 = v2;

    this._n0 = n0;
    this._n1 = n1;
    this._n2 = n2;

    this._uv0 = uv0;
    this._uv1 = uv1;
    this._uv2 = uv2;

    this._edge1 = vec3.create();
    vec3.subtract(this._edge1, v1, v0);
    this._edge2 = vec3.create();
    vec3.subtract(this._edge2, v2, v0);

    // console.log(this._edge1[0] + " " + this._edge1[1] + " " + this._edge1[2]);
    // console.log(this._edge2[0] + " " + this._edge2[1] + " " + this._edge2[2]);

    let edge_cross = vec3.create();
    vec3.cross(edge_cross, this._edge1, this._edge2);
    this._triangleArea = 0.5 * vec3.length(edge_cross);
    //console.log(this._triangleArea);
  }

  public updateTriangle() {
    // this._edge1 = vec3.create();
    // vec3.subtract(this._edge1, v1, v0);
    // this._edge2 = vec3.create();
    // vec3.subtract(this._edge2, v2, v0);
  }


  get v0() { return this._v0; }
  get v1() { return this._v1; }
  get v2() { return this._v2; }
  set v2(value: GLM.IArray) { this._v2 = value; }
  set v1(value: GLM.IArray) { this._v1 = value; }
  set v0(value: GLM.IArray) { this._v0 = value; }
  get n2(): GLM.IArray { return this._n2;}
  get n1(): GLM.IArray { return this._n1; }
  get n0(): GLM.IArray { return this._n0; }
  get uv2(): GLM.IArray { return this._uv2; }
  get uv1(): GLM.IArray { return this._uv1; }
  get uv0(): GLM.IArray { return this._uv0; }
  get edge1() { return this._edge1; }
  get edge2() { return this._edge2; }
  get objectIndex(): number { return this._objectIndex; }
  set objectIndex(value: number) { this._objectIndex = value; }
  get triangleIndex(): number { return this._triangleIndex; }
  set triangleIndex(value: number) { this._triangleIndex = value; }
  get triangleArea() { return this._triangleArea; }

  public rayIntersection(ray: Ray, collision_pos: GLM.IArray): boolean {
    let EPS = 0.0001;

    //Begin calculating determinant - also used to calculate u parameter
    let P = vec3.fromValues(0,0,0);
    vec3.cross(P, ray.direction, this._edge2);
    let det = vec3.dot(this._edge1, P);

    if (det > -EPS && det < EPS) return false;
    let inv_det = 1.0 / det;

    //Distance from vertex1 to ray origin
    let T = vec3.fromValues(0,0,0);
    vec3.subtract(T, ray.startPosition, this._v0);
    let u = vec3.dot(T, P);
    if (u < 0.0 || u > det) return false;

    let Q = vec3.fromValues(0,0,0);
    vec3.cross(Q, T, this._edge1);

    let v = vec3.dot(ray.direction, Q);
    if(v < 0.0 || u+v > det) return false;

    let t = vec3.dot(this._edge2, Q);

    if(t > EPS) {
      let dir = vec3.fromValues(0,0,0);
      vec3.scale(dir, ray.direction, t * inv_det);
      vec3.add(collision_pos, ray.startPosition, T);
      return true;
    }

    return false;
  }
}
