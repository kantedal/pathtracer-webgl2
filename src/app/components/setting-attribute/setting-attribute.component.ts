import {Component, Input} from '@angular/core'
import {ISettingAttribute} from '../../renderer/settings/setting'
import {BehaviorSubject} from 'rxjs'
const hexRgb = require('hex-rgb');

@Component({
  selector: 'setting-attribute',
  templateUrl: './setting-attribute.html',
  styleUrls: ['./setting-attribute.css']
})
export class SettingAttributeComponent {
  @Input() attribute: BehaviorSubject<ISettingAttribute>

  constructor() {}

  updateAttribute(value: any) {
    let newAttribute = this.attribute.getValue()
    newAttribute.value = value
    this.attribute.next(newAttribute)
  }
}
