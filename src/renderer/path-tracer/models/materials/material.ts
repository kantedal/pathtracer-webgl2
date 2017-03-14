export const MATERIAL_TYPES = {
  diffuse: 0,
  specular: 1,
  emission: 2,
  transmission: 3,
  glossy: 5
};

export default class Material {
  private _material_type: number;
  private _color: GLM.IArray;
  private _emission_rate: number;
  private _material_index: number;

  constructor(color: GLM.IArray, material_type: number, emission_rate?: number) {
    this._material_type = material_type;
    this._color = color;

    if (emission_rate != null)
      this._emission_rate = emission_rate;
    else
      this._emission_rate = 0;
  }

  public toJSON() {
    return {
      material_type: this._material_type,
      color: [this._color[0], this._color[1], this._color[2]],
      emission_rate: this._emission_rate
    }
  }

  get material_type() { return this._material_type; }
  get color() { return this._color; }
  get emission_rate() { return this._emission_rate; }
  set emission_rate(rate) { this._emission_rate = rate; }
  get material_index(): number { return this._material_index;}
  set material_index(value: number) { this._material_index = value;}
}
