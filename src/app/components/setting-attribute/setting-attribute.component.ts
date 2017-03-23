import {Component, Input, AfterViewInit} from '@angular/core'
import {ISettingAttribute, UI_TYPE_SLIDER, UI_TYPE_TOGGLE, UI_TYPE_TEXTFIELD, UI_TYPE_COLORPICKER} from '../../renderer/settings/setting'
import {BehaviorSubject} from 'rxjs'
const hexRgb = require('hex-rgb');
const rgbHex = require('rgb-hex');

@Component({
  selector: 'setting-attribute',
  templateUrl: './setting-attribute.html',
  styleUrls: ['./setting-attribute.css']
})
export class SettingAttributeComponent implements AfterViewInit {
  @Input() attribute: BehaviorSubject<ISettingAttribute>
  color = '#666666'

  constructor() {}

  updateAttribute(value: any) {
    let newAttribute = this.attribute.getValue()
    newAttribute.value = value
    this.attribute.next(newAttribute)
  }

  hexToRgb(hex: any): GLM.IArray {
    let color = hexRgb(hex)
    return vec3.fromValues(color[0] / 255, color[1] / 255, color[2] / 255)
  }

  ngAfterViewInit(): void {
    if (this.attribute.getValue().uiType == UI_TYPE_COLORPICKER) {
      //this.color = '#' + rgbHex(255 * this.attribute.getValue().value[0], 255 * this.attribute.getValue().value[1], 255 * this.attribute.getValue().value[2])
    }
  }
}
