import {Setting, UI_TYPE_TOGGLE, UI_TYPE_SLIDER, UI_TYPE_COLORPICKER} from "../setting";
import {FLOAT_TYPE, VEC3_TYPE} from "../../utils/shader";

export class BloomSettings extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Bloom enabled',
      uiType: UI_TYPE_TOGGLE,
      value: 0.0,
      uniformName: 'u_bloomEnabled',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Bloom alpha',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 1.0,
        stepSize: 0.01,
      },
      value: 0.2,
      uniformName: 'u_bloomAlpha',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Bloom iterations',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 30.0,
        stepSize: 1.0,
      },
      value: 5.0,
      uniformName: 'u_bloomIterations',
      uniformType: FLOAT_TYPE
    })
  }
}