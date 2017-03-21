import {Setting} from "./setting";
import {FLOAT_TYPE} from "../utils/shader";

export default class LightSettings extends Setting {
  constructor() {
    super()
    this.attributes.push({
      name: 'Global light power',
      value: 20.0,
      minValue: 0.0,
      maxValue: 3.0,
      stepSize: 0.01,
      uniformName: 'u_globalLightPower',
      uniformType: FLOAT_TYPE
    })
  }
}