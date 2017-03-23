import Fractal from "./fractal";
import {FLOAT_TYPE} from "../../utils/shader";
import {Setting, UI_TYPE_SLIDER} from "../setting";

export class MengerSponge extends Setting {
  isEnabled: boolean = true

  constructor() {
    super()
    this.addAttribute({
      name: 'Sponge scale',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 3.0,
        stepSize: 0.1,
      },
      value: 1.0,
      uniformName: 'u_spongeScale',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Half sponge scale',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 3.0,
        stepSize: 0.1,
      },
      value: 0.5,
      uniformName: 'u_halfSpongeScale',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Sponge offset',
      uiType: UI_TYPE_SLIDER,
      uiAttributes: {
        minValue: 0.0,
        maxValue: 1.0,
        stepSize: 0.0001,
      },
      value: 0.0,
      uniformName: 'u_spongeOffset',
      uniformType: FLOAT_TYPE
    })
  }
}