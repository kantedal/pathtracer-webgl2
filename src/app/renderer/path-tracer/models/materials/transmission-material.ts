import Material from "./material";
import {MATERIAL_TYPES} from "./material";

export default class TransmissionMaterial extends Material {
  private _refractionIndex: number;
  private _reflectRefractRatio: number;
  private _roughness: number;

  constructor(color: GLM.IArray) {
    super(color, MATERIAL_TYPES.transmission);
    this._refractionIndex = 1.3;
    this._reflectRefractRatio = 0.2;
    this._roughness = 0.0;
  }

  get refractionIndex(): number { return this._refractionIndex; }
  set refractionIndex(value: number) { this._refractionIndex = value; }
  get reflectRefractRatio(): number { return this._reflectRefractRatio;}
  set reflectRefractRatio(value: number) { this._reflectRefractRatio = value; }
  get roughness(): number { return this._roughness; }
  set roughness(value: number) { this._roughness = value; }
}
