import {MATERIAL_TYPES, default as Material} from "./material";

export class DiffuseMaterial extends Material {
  private _roughness: number;
  private _albedo: number;

  constructor(color: GLM.IArray) {
    super(color, MATERIAL_TYPES.diffuse);
    this._albedo = 1.8;
    this._roughness = 1.0;
  }

  get albedo(): number { return this._albedo; }
  set albedo(value: number) { this._albedo = value; }
  get roughness(): number { return this._roughness; }
  set roughness(value: number) { this._roughness = value; }
}
