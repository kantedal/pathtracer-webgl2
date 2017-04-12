import {Setting, UI_TYPE_SLIDER, UI_TYPE_COLORPICKER, UI_TYPE_TOGGLE} from "./setting";
import {FLOAT_TYPE, VEC3_TYPE} from "../utils/shader";

export default class LightSettings extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Image based lightning',
      uiType: UI_TYPE_TOGGLE,
      value: 1.0,
      uniformName: 'u_imageBasedLightning',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Global light power',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 5.0,
        stepSize: 0.01,
      },
      value: 1.0,
      uniformName: 'u_globalLightPower',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Global light contrast',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 5.0,
        stepSize: 0.1,
      },
      value: 1.5,
      uniformName: 'u_globalLightContrast',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Fill background',
      uiType: UI_TYPE_TOGGLE,
      value: 0.0,
      uniformName: 'u_fillBackgroundWithLight',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Global light color',
      uiType: UI_TYPE_COLORPICKER,
      value: [0.6,0.6,0.6],
      uniformName: 'u_globalLightColor',
      uniformType: VEC3_TYPE
    })
  }
}
