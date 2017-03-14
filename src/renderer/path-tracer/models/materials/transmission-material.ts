import Material from "./material";
import {MATERIAL_TYPES} from "./material";

export default class TransmissionMaterial extends Material {
  private _refractionIndex: number;

  constructor(color: GLM.IArray) {
    super(color, MATERIAL_TYPES.transmission);
    this._refractionIndex = 1.3;
  }

  get refractionIndex(): number { return this._refractionIndex; }
  set refractionIndex(value: number) { this._refractionIndex = value; }
}
