import Fractal from "./fractal";
import {FLOAT_TYPE} from "../../utils/shader";

export class MengerSponge extends Fractal {
  isEnabled: boolean = true

  constructor() {
    super()
    this.addAttribute({
      name: 'Sponge scale',
      value: 1.0,
      minValue: 0.0,
      maxValue: 3.0,
      stepSize: 0.01,
      uniformName: 'u_spongeScale',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Half sponge scale',
      value: 0.5,
      minValue: 0.0,
      maxValue: 3.0,
      stepSize: 0.01,
      uniformName: 'u_halfSpongeScale',
      uniformType: FLOAT_TYPE
    })

    this.addAttribute({
      name: 'Sponge offset',
      value: 0.0,
      minValue: 0.0,
      maxValue: 1.0,
      stepSize: 0.001,
      uniformName: 'u_spongeOffset',
      uniformType: FLOAT_TYPE
    })
  }
}