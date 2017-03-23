
import {Setting, UI_TYPE_SLIDER, UI_TYPE_COLORPICKER, UI_TYPE_TOGGLE} from "./setting";
import {FLOAT_TYPE, VEC3_TYPE} from "../utils/shader";
export class RenderEffectsSetting extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Fog enabled',
      uiType: UI_TYPE_TOGGLE,
      value: 0.0,
      uniformName: 'u_fogEnabled',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Fog amount',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 2.0,
        stepSize: 0.001,
      },
      value: 0.2,
      uniformName: 'u_fogDistance',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Fog color',
      uiType: UI_TYPE_COLORPICKER,
      value: [0.2, 0.2, 0.2],
      uniformName: 'u_fogColor',
      uniformType: VEC3_TYPE
    })
  }
}