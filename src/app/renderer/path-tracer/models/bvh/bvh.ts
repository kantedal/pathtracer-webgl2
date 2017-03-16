import Triangle from "../primitives/triangle";
import {BVHInner, BVHLeaf, BVHNode} from "./bvh-node";

class BVHSplit {
  public min_cost;
  public best_split;
  public best_axis;

  constructor(_min_cost: number, _best_split: number, _best_axis: number) {
    this.min_cost = _min_cost;
    this.best_split = _best_split;
    this.best_axis = _best_axis;
  }
}

export default class BVH {
  public static MAX_SIZE = 3000;

  private _triangles: Array<Triangle>;
  private _triangleIndices: Array<number>;
  private _triangleIndexTexture: Float32Array;
  private _triangleCount: number;
  private _bvhTexture: Float32Array;
  private _bvhArray: Array<number>;
  public count = 0;

  private _root: BVHInner | BVHLeaf | BVHNode;

  constructor() {
    this._bvhTexture = new Float32Array(2048 * 2048 * 3);
    this._bvhArray = [];
    this._triangleIndexTexture = new Float32Array(1024 * 1024 * 3);
    this._triangleCount = 0;
  }

  public createBVH(triangles: Array<Triangle>) {
    this._triangles = triangles;
    let workBoxes = [];
    let bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    let top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);

    for (let triangle of triangles) {
      let bbox = new WorkBoundingBox();
      bbox.triangle = triangle;

      // Set bottom of bounding box
      vec3.min(bbox.bottom, bbox.bottom, triangle.v0);
      vec3.min(bbox.bottom, bbox.bottom, triangle.v1);
      vec3.min(bbox.bottom, bbox.bottom, triangle.v2);

      // Set top of bounding box
      vec3.max(bbox.top, bbox.top, triangle.v0);
      vec3.max(bbox.top, bbox.top, triangle.v1);
      vec3.max(bbox.top, bbox.top, triangle.v2);

      // Set center of bounding box
      vec3.add(bbox.center, bbox.top, bbox.bottom);
      vec3.scale(bbox.center, bbox.center, 0.5);

      vec3.min(bottom, bottom, bbox.bottom);
      vec3.max(top, top, bbox.top);

      workBoxes.push(bbox);
    }

    this._root = this.recurse(workBoxes, 0);
    this._root.bottom = bottom;
    this._root.top = top;

    this.createBVHTexture(this._root, new NodeCounter(0), new NodeCounter(0), 0);
  }

  private findBestSplitPlane(bvh_split: BVHSplit, axis: number, test_split: number, workBoxes: Array<WorkBoundingBox>): any {
    // Left and right bounding box
    let left_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    let left_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
    let right_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    let right_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);

    let count_left = 0;
    let count_right = 0;

    for (let box of workBoxes) {
      let value = box.center[axis];

      if (value < test_split) {
        vec3.min(left_bottom, left_bottom, box.bottom);
        vec3.max(left_top, left_top, box.top);
        count_left++;
      }
      else {
        vec3.min(right_bottom, right_bottom, box.bottom);
        vec3.max(right_top, right_top, box.top);
        count_right++;
      }
    }

    // Bins with less than 1 elements not accepted
    if (count_left <= 1 || count_right <= 1) return;

    // Calculate surface areas
    let left_side1 = left_top[0] - left_bottom[0];
    let left_side2 = left_top[1] - left_bottom[1];
    let left_side3 = left_top[2] - left_bottom[2];

    let right_side1 = right_top[0] - right_bottom[0];
    let right_side2 = right_top[1] - right_bottom[1];
    let right_side3 = right_top[2] - right_bottom[2];

    let surface_left = left_side1*left_side2 + left_side2*left_side3 + left_side3*left_side1;
    let surface_right = right_side1*right_side2 + right_side2*right_side3 + right_side3*right_side1;

    // Calculate total cost
    let total_cost = surface_left*count_left + surface_right*count_right;

    if (total_cost < bvh_split.min_cost) {
      bvh_split.min_cost = total_cost;
      bvh_split.best_split = test_split;
      bvh_split.best_axis = axis;
    }
  }

  private recurse(workBoxes: Array<WorkBoundingBox>, depth): BVHNode {
    // Terminate if work boxes has less than 4 triangles
    if (workBoxes.length < 4) {
      let leaf = new BVHLeaf();
      for (let box of workBoxes) {
        leaf.triangles.push(box.triangle);
      }
      return leaf;
    }

    // Continue splitting if there are more than 4 triangles
    let bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    let top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);

    // Set size of box for remaining elements
    for (let box of workBoxes) {
      vec3.min(bottom, bottom, box.bottom);
      vec3.max(top, top, box.top);
    }

    // Dimensions of bounding box
    let side1 = top[0] - bottom[0]; // x
    let side2 = top[1] - bottom[1]; // y
    let side3 = top[2] - bottom[2]; // z

    let bvh_split = new BVHSplit(workBoxes.length * (side1*side2 + side2*side3 + side3*side1), 10000, -1);

    // Try all axis
    for (let axis = 0; axis < 3; axis++) {
      let start = bottom[axis];
      let stop = top[axis];

      if (Math.abs(stop - start) < 0.0001)
        continue;

      let step = (stop - start) / (128.0 / (depth + 1.0));
      for (let test_split = start + step; test_split < stop - step; test_split += step) {
        this.findBestSplitPlane(bvh_split, axis, test_split, workBoxes);
      }

    }

    // No best axis found, create leaf node
    if (bvh_split.best_axis == -1) {
      let leaf = new BVHLeaf();
      for (let box of workBoxes) {
        leaf.triangles.push(box.triangle);
      }
      return leaf;
    }

    let left = []; // Left split bounding boxes
    let right = []; // Right split bounding boxes

    let left_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    let left_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
    let right_bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    let right_top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);

    for (let box of workBoxes) {
      let value = box.center[bvh_split.best_axis];

      if (value < bvh_split.best_split) {
        left.push(box);
        vec3.min(left_bottom, left_bottom, box.bottom);
        vec3.max(left_top, left_top, box.top);
      }
      else {
        right.push(box);
        vec3.min(right_bottom, right_bottom, box.bottom);
        vec3.max(right_top, right_top, box.top);
      }
    }

    // Create inner node
    let inner = new BVHInner();
    inner.left = this.recurse(left, depth + 1);
    inner.left.bottom = left_bottom;
    inner.left.top = left_top;

    inner.right = this.recurse(right, depth + 1);
    inner.right.bottom = right_bottom;
    inner.right.top = right_top;

    return inner;
  }

  public createBVHTexture(node: any, node_index: NodeCounter, triangle_index: NodeCounter, parent_index: number) {
    node.nodeIndex = node_index.count;

    //First slots gets filled with bounding box
    this._bvhTexture[node.nodeIndex + 0] = node.bottom[0];
    this._bvhTexture[node.nodeIndex + 1] = node.bottom[1];
    this._bvhTexture[node.nodeIndex + 2] = node.bottom[2];

    this._bvhTexture[node.nodeIndex + 3] = node.top[0];
    this._bvhTexture[node.nodeIndex + 4] = node.top[1];
    this._bvhTexture[node.nodeIndex + 5] = node.top[2];

    this.count += 6;

    if (!node.isLeaf()) {
      let node_index_right = node_index.increment(12);
      this.createBVHTexture(node.right, node_index, triangle_index, node.nodeIndex / 12);

      let node_index_left = node_index.increment(12);
      this.createBVHTexture(node.left, node_index, triangle_index, node.nodeIndex / 12);

      this.setSibling(node.left, node_index_right / 12);
      this.setSibling(node.right, node_index_left / 12);

      this._bvhTexture[node.nodeIndex + 6] = 0;
      this._bvhTexture[node.nodeIndex + 7] = node_index_left / 12;
      this._bvhTexture[node.nodeIndex + 8] = node_index_right / 12;

      this._bvhTexture[node.nodeIndex + 9] = parent_index;
      this._bvhTexture[node.nodeIndex + 10] = 0;
      this._bvhTexture[node.nodeIndex + 11] = 0;

      this.count += 6;
    }
    else {
      let count = node.triangles.length;
      let start_triangle_index = triangle_index.count;

      this._bvhTexture[node.nodeIndex + 6] = 1;
      this._bvhTexture[node.nodeIndex + 7] = count;
      this._bvhTexture[node.nodeIndex + 8] = start_triangle_index;

      this._bvhTexture[node.nodeIndex + 9] = parent_index;
      this._bvhTexture[node.nodeIndex + 10] = 0;
      this._bvhTexture[node.nodeIndex + 11] = 0;

      this.count += 6;

      for (let triangle of node.triangles) {
        this._triangleIndexTexture[3 * triangle_index.count] = triangle.triangleIndex;
        this._triangleIndexTexture[3 * triangle_index.count + 1] = 0;
        this._triangleIndexTexture[3 * triangle_index.count + 2] = 0;
        triangle_index.increment(1);
        this._triangleCount += 3;
      }
    }
  }

  setSibling(node: any, sibling: number) {
    this._bvhTexture[node.nodeIndex + 10] = sibling;
  }

  get root(): any { return this._root; }
  get bvhTexture(): Float32Array { return this._bvhTexture; }
  get triangleIndexTexture(): Float32Array { return this._triangleIndexTexture; }
  get bvhArray(): Array<number> { return this._bvhArray; }
  get triangleCount(): number { return this._triangleCount; }
}


class NodeCounter {
  public count: number;
  constructor(count: number) {
    this.count = count;
  }

  public increment(count: number): number {
    this.count += count;
    return this.count;
  }
}

// Used to build the BVH tree
export class WorkBoundingBox {
  private _triangle: Triangle;
  private _top: GLM.IArray;
  private _bottom: GLM.IArray;
  private _center: GLM.IArray;

  constructor() {
    this._top = vec3.fromValues(-BVH.MAX_SIZE, -BVH.MAX_SIZE, -BVH.MAX_SIZE);
    this._bottom = vec3.fromValues(BVH.MAX_SIZE, BVH.MAX_SIZE, BVH.MAX_SIZE);
    this._center = vec3.fromValues(0, 0, 0);
  }

  get triangle(): Triangle { return this._triangle; }
  set triangle(value: Triangle) { this._triangle = value; }
  get center(): GLM.IArray { return this._center; }
  set center(value: GLM.IArray) { this._center = value; }
  get bottom(): GLM.IArray { return this._bottom;}
  set bottom(value: GLM.IArray) { this._bottom = value; }
  get top(): GLM.IArray { return this._top; }
  set top(value: GLM.IArray) { this._top = value; }
}

