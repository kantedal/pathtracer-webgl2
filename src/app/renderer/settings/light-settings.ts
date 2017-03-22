import {Setting, UI_TYPE_SLIDER, UI_TYPE_COLORPICKER} from "./setting";
import {FLOAT_TYPE, VEC3_TYPE} from "../utils/shader";

export default class LightSettings extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Global light power',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 20.0,
        stepSize: 0.01,
      },
      value: 3.0,
      uniformName: 'u_globalLightPower',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Global light contrast',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 10.0,
        stepSize: 0.1,
      },
      value: 2.0,
      uniformName: 'u_globalLightContrast',
      uniformType: FLOAT_TYPE
    })

    // this.addAttribute({
    //   name: 'Global light color',
    //   uiType: UI_TYPE_COLORPICKER,
    //   value: 2.0,
    //   minValue: 0.0,
    //   maxValue: 10.0,
    //   stepSize: 0.1,
    //   uniformName: 'u_globalLightColor',
    //   uniformType: VEC3_TYPE
    // })
  }
}
