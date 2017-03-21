import {BehaviorSubject} from "rxjs";
export interface IFractalAttribute {
  name: string
  value: any
  minValue: number
  maxValue: number
  stepSize: number
  uniformName: string
  uniformType: number
}

export default class Fractal {
  attributes: BehaviorSubject<IFractalAttribute>[]

  constructor() {
    this.attributes = []
  }

  public setAttribute(attributeSub: BehaviorSubject<IFractalAttribute>, value: any) {
    let newAttribute = attributeSub.getValue()
    newAttribute.value = value
    attributeSub.next(newAttribute)
  }

  protected addAttribute(attribute: IFractalAttribute) {
    this.attributes.push(new BehaviorSubject(attribute))
  }
}