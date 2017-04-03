import {Setting, UI_TYPE_SLIDER, UI_TYPE_COLORPICKER, UI_TYPE_DROPDOWN} from "./setting";
import {FLOAT_TYPE, VEC3_TYPE} from "../utils/shader";

export default class MaterialSettings extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Material type',
      uiType: UI_TYPE_DROPDOWN,
      uiAttributes: {
        alternatives: [{ id: 0, name: 'Diffuse' }, { id: 5, name: 'Glossy' },  { id: 1, name: 'Specular' }, { id: 2, name: 'Transmission' }]
      },
      value: 0.0,
      uniformName: 'u_materialType',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Color',
      uiType: UI_TYPE_COLORPICKER,
      value: [1.0,1.0,1.0],
      uniformName: 'u_materialColor',
      uniformType: VEC3_TYPE
    })

    this.addAttribute({
      name: 'Shininess',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 10.0,
        stepSize: 0.01,
      },
      value: 2.0,
      uniformName: 'u_materialExtra1',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Albedo',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 10.0,
        stepSize: 0.01,
      },
      value: 2.0,
      uniformName: 'u_materialExtra2',
      uniformType: FLOAT_TYPE
    })
  }
}
