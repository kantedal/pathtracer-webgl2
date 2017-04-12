import {Setting, UI_TYPE_SLIDER, UI_TYPE_COLORPICKER, UI_TYPE_TOGGLE, UI_TYPE_VEC2} from "./setting";
import {FLOAT_TYPE, VEC3_TYPE, INTEGER_TYPE, VEC2_TYPE} from "../utils/shader";

export default class RenderSettings extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Resolution',
      uiType: UI_TYPE_VEC2,
      value: vec2.fromValues(512,512),
      uniformName: 'resolution',
      uniformType: VEC2_TYPE
    })

    this.addAttribute({
      name: 'Trace depth',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 1,
        maxValue: 10,
        stepSize: 1
      },
      value: 3,
      uniformName: 'trace_depth',
      uniformType: INTEGER_TYPE
    })

  }
}
