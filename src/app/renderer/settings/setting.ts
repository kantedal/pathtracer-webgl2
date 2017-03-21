import {BehaviorSubject} from "rxjs";

export interface ISettingAttribute {
  name: string
  value: any
  minValue: number
  maxValue: number
  stepSize: number
  uniformName: string
  uniformType: number
}

export class Setting {
  attributes: BehaviorSubject<ISettingAttribute>[] = []

  constructor() {}

  public setAttribute(attributeSub: BehaviorSubject<ISettingAttribute>, value: any) {
    let newAttribute = attributeSub.getValue()
    newAttribute.value = value
    attributeSub.next(newAttribute)
  }

  protected addAttribute(attribute: ISettingAttribute) {
    this.attributes.push(new BehaviorSubject(attribute))
  }
}