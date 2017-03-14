import Material from "../materials/material";
import BoundingBox from "../bvh/bounding-box";

export default class Intersectable {
  private _material: Material;
  private _boundingBox: BoundingBox;
  private _type: number;
  private _position: GLM.IArray;
  private _rotation: GLM.IArray;
  private _scale: GLM.IArray;
  private _textureIndex: number;

  private _triangleStartIndex: number = -1;
  private _triangleEndIndex: number = -1;
  private _BVHStartIndex: number = -1;
  private _BVHEndIndex: number = -1;

  constructor(material: Material) {
    this._material = material;
    this._position = vec3.fromValues(0, 0, 0);
    this._scale = vec3.fromValues(1, 1, 1);
    this._rotation = vec3.fromValues(0, 0, 0);
    this._boundingBox = new BoundingBox();
  }

  get boundingBox(): BoundingBox { return this._boundingBox; }
  set boundingBox(value: BoundingBox) { this._boundingBox = value; }
  get type(): number { return this._type; }
  get scale(): GLM.IArray { return this._scale; }
  set scale(value: GLM.IArray) { this._scale = value; }
  get rotation(): GLM.IArray { return this._rotation;}
  set rotation(value: GLM.IArray) { this._rotation = value; }
  get position(): GLM.IArray { return this._position; }
  set position(value: GLM.IArray) { this._position = value; }
  get material(): Material { return this._material; }
  set material(value: Material) { this._material = value; }
  get textureIndex(): number { return this._textureIndex; }
  set textureIndex(value: number) { this._textureIndex = value; }
}
