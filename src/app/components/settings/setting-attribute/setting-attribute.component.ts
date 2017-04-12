import {Component, Input, AfterContentChecked} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ISettingAttribute, UI_TYPE_COLORPICKER, UI_TYPE_TOGGLE, UI_TYPE_VEC2} from "../../../renderer/settings/setting";
const hexRgb = require('hex-rgb');
const rgbHex = require('rgb-hex');

@Component({
  selector: 'setting-attribute',
  templateUrl: 'setting-attribute.html',
  styleUrls: ['setting-attribute.css']
})
export class SettingAttributeComponent implements AfterContentChecked {
  @Input() attribute: BehaviorSubject<ISettingAttribute>

  // Color attributes
  color = '#666666'
  redClr = 255
  blueClr = 255
  greenClr = 255

  // Vector attributes
  vec = [0,0,0]

  // Dropdown attributes
  dropdownSelection = 0

  // Toggle attributes
  enabled: boolean = true

  constructor() {}

  updateAttribute(value: any) {
    let newAttribute = this.attribute.getValue()
    newAttribute.value = value
    this.attribute.next(newAttribute)
  }

  updateColor() {
    this.updateAttribute(vec3.fromValues(this.redClr / 255, this.greenClr / 255, this.blueClr / 255))
  }

  updateVec2() {
    this.updateAttribute(vec2.fromValues(this.vec[0], this.vec[1]))
  }

  hexToRgb(hex: any): GLM.IArray {
    let color = hexRgb(hex)
    return vec3.fromValues(color[0] / 255, color[1] / 255, color[2] / 255)
  }

  updateDropdown() {
    this.updateAttribute(this.dropdownSelection)
  }

  ngAfterContentChecked(): void {
    let attr = this.attribute.getValue()
    switch (attr.uiType) {
      case UI_TYPE_COLORPICKER:
        this.redClr = attr.value[0] * 255
        this.greenClr = attr.value[1] * 255
        this.blueClr = attr.value[2] * 255
        break
      case UI_TYPE_TOGGLE:
        this.enabled = attr.value == 1.0
        break
      case UI_TYPE_VEC2:
        this.vec[0] = attr.value[0]
        this.vec[1] = attr.value[1]
        break
    }
  }
}
