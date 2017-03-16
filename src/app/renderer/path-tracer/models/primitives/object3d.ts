import Intersectable from "./intersectable";
import Triangle from "./triangle";
import Ray from "../ray";
import BVH from "../bvh/bvh";

export class Object3d extends Intersectable {
  private _bvh: BVH;
  private _triangles: Array<Triangle>;
  private _smoothShading: boolean = false;

  constructor(triangles, material) {
    super(material);

    this._triangles = triangles;
    this.boundingBox.calculateBoundingBoxFromTriangles(this._triangles);
    this._bvh = new BVH();
  }

  public updatePosition(new_position: GLM.IArray) {
    for (let triangle of this._triangles) {
      vec3.sub(triangle.v0, triangle.v0, this.position);
      vec3.sub(triangle.v1, triangle.v1, this.position);
      vec3.sub(triangle.v2, triangle.v2, this.position);

      vec3.add(triangle.v0, triangle.v0, new_position);
      vec3.add(triangle.v1, triangle.v1, new_position);
      vec3.add(triangle.v2, triangle.v2, new_position);
    }
    this.position = new_position;
  }

  private recurseBBoxes(node: any, ray: Ray, colliding_positions: Array<any>) {
    if (!node.isLeaf()) {
      if (node.left.rayIntersection(ray)) {
        this.recurseBBoxes(node.left, ray, colliding_positions);
      }

      if (node.right.rayIntersection(ray)) {
        this.recurseBBoxes(node.right, ray, colliding_positions);
      }
    }
    else {
      for (let triangle of node.triangles) {
        let collision_pos = vec3.create();
        if (triangle.rayIntersection(ray, collision_pos)) {
          colliding_positions.push(collision_pos);
        }
      }
    }
  }

  public rayIntersection(ray: Ray, collision_pos: GLM.IArray): boolean {
    let colliding_positions = [];
    let node = this._bvh.root;
    this.recurseBBoxes(node, ray, colliding_positions);

    if (colliding_positions.length != 0) {
      collision_pos[0] = colliding_positions[0][0];
      collision_pos[1] = colliding_positions[0][1];
      collision_pos[2] = colliding_positions[0][2];

      return true;
    }
    else {
      return false;
    }
  }

  public toJSON() {
    let triangles = [];
    for (let triangle of this._triangles) {
      triangles.push([
        [triangle.v0[0], triangle.v0[1], triangle.v0[2]],
        [triangle.v1[0], triangle.v1[1], triangle.v1[2]],
        [triangle.v2[0], triangle.v2[1], triangle.v2[2]],
      ]);
    }

    return {
      position: [this.position[0], this.position[1], this.position[2]],
      rotation: [this.position[0], this.position[1], this.position[2]],
      triangles: triangles,
      material_index: this.material.material_index
    };
  }

  static LoadObj(objData, material) {
    let vertices = [];
    let vertexNormals = [];
    let vertexUVs = [];
    let triangles = [];

    let lines = objData.split('\n');
    for (let line of lines) {
      let components = line.split(' ');

      switch (components[0]) {
        // Vertex indices
        case 'f':
          let indices1 = components[1].split('/');
          let indices2 = components[2].split('/');
          let indices3 = components[3].split('/');

          //vertexUVs[parseInt(indices1[1]) - 1], vertexUVs[parseInt(indices2[1]) - 1], vertexUVs[parseInt(indices3[1]) - 1])
          triangles.push(new Triangle(
            vertices[parseInt(indices1[0]) - 1], vertices[parseInt(indices2[0]) - 1], vertices[parseInt(indices3[0]) - 1],
            vertexNormals[parseInt(indices1[2]) - 1], vertexNormals[parseInt(indices2[2]) - 1], vertexNormals[parseInt(indices3[2]) - 1],
            vertexUVs[parseInt(indices1[1]) - 1], vertexUVs[parseInt(indices2[1]) - 1], vertexUVs[parseInt(indices3[1]) - 1])
          );
          break;

        // Vertex positions
        case 'v':
          vertices.push(vec3.fromValues(components[1], components[2], components[3]));
          break;
        case 'vn':
          vertexNormals.push(vec3.fromValues(components[1], components[2], components[3]));
          break;
        case 'vt':
          vertexUVs.push(vec2.fromValues(components[1], components[2]));
          break;
      }
    }

    return new Object3d(triangles, material);
  }

  get triangles() { return this._triangles; }
  get bvh(): BVH { return this._bvh; }
  get smoothShading(): boolean { return this._smoothShading; }
  set smoothShading(value: boolean) { this._smoothShading = value; }
}
