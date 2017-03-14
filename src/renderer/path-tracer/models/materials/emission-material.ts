import Material, {MATERIAL_TYPES} from "./material";

export class EmissionMaterial extends Material {
  constructor(color: GLM.IArray) {
    super(color, MATERIAL_TYPES.emission, 5.0);
  }
}
