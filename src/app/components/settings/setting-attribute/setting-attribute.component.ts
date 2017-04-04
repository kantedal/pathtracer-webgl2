import {Component, Input, AfterViewInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ISettingAttribute, UI_TYPE_COLORPICKER} from "../../../renderer/settings/setting";
const hexRgb = require('hex-rgb');
const rgbHex = require('rgb-hex');

@Component({
  selector: 'setting-attribute',
  templateUrl: 'setting-attribute.html',
  styleUrls: ['setting-attribute.css']
})
export class SettingAttributeComponent implements AfterViewInit {
  @Input() attribute: BehaviorSubject<ISettingAttribute>

  // Color attributes
  color = '#666666'
  redClr = 255
  blueClr = 255
  greenClr = 255

  // Dropdown attributes
  dropdownSelection = 0

  constructor() {}

  updateAttribute(value: any) {
    let newAttribute = this.attribute.getValue()
    newAttribute.value = value
    this.attribute.next(newAttribute)
  }

  updateColor() {
    this.updateAttribute(vec3.fromValues(this.redClr / 255, this.greenClr / 255, this.blueClr / 255))
  }

  hexToRgb(hex: any): GLM.IArray {
    let color = hexRgb(hex)
    return vec3.fromValues(color[0] / 255, color[1] / 255, color[2] / 255)
  }

  updateDropdown() {
    this.updateAttribute(this.dropdownSelection)
  }

  ngAfterViewInit(): void {
    if (this.attribute.getValue().uiType == UI_TYPE_COLORPICKER) {
      //this.color = '#' + rgbHex(255 * this.attribute.getValue().value[0], 255 * this.attribute.getValue().value[1], 255 * this.attribute.getValue().value[2])
    }
  }
}
