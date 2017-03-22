import {BehaviorSubject} from "rxjs";
import Shader from '../utils/shader'

export const UI_TYPE_SLIDER = 'UI_TYPE_SLIDER'
export const UI_TYPE_TOGGLE = 'UI_TYPE_TOGGLE'
export const UI_TYPE_TEXTFIELD = 'UI_TYPE_TEXTFIELD'
export const UI_TYPE_COLORPICKER = 'UI_TYPE_COLORPICKER'

export interface ISliderAttribute {
  minValue: number
  maxValue: number
  stepSize: number
}


export interface ISettingAttribute {
  name: string
  uiType: string
  uiAttributes?: ISliderAttribute
  value: any
  uniformName: string
  uniformType: number
}

export class Setting {
  attributes: BehaviorSubject<ISettingAttribute>[] = []

  constructor() {}

  public connectShader(shader: Shader) {
    for (let attribute of this.attributes) {
      attribute.asObservable().subscribe(attr => {
        console.log(attr.uniformName, attr.value)
        shader.setUniform(attr.uniformName, { type: attr.uniformType, value: attr.value })
      })
    }
  }

  public setAttribute(attributeSub: BehaviorSubject<ISettingAttribute>, value: any) {
    let newAttribute = attributeSub.getValue()
    newAttribute.value = value
    attributeSub.next(newAttribute)
  }

  protected addAttribute(attribute: ISettingAttribute) {
    this.attributes.push(new BehaviorSubject(attribute))
  }
}
