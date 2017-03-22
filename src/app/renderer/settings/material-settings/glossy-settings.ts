import {Setting, UI_TYPE_SLIDER} from "../setting";
import {FLOAT_TYPE} from "../../utils/shader";

export default class GlossySettings extends Setting {
  constructor() {
    super()

    this.addAttribute({
      name: 'Global light power',
      uiType: UI_TYPE_SLIDER,
      value: 3.0,
      minValue: 0.0,
      maxValue: 20.0,
      stepSize: 0.01,
      uniformName: 'u_globalLightPower',
      uniformType: FLOAT_TYPE
    })
  }
}
