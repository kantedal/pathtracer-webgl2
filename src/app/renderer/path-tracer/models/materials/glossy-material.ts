import Material, {MATERIAL_TYPES} from "./material";

export class GlossyMaterial extends Material {
  private _shininess: number;

  constructor(color: GLM.IArray) {
    super(color, MATERIAL_TYPES.glossy);
    this._shininess = 10.0;
  }

  get shininess(): number { return this._shininess; }
  set shininess(value: number) { this._shininess = value; }
}
