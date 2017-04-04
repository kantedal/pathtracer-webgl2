import {Component} from "@angular/core";
import {SettingsService} from "../../../renderer/settings/settings.service";
const hexRgb = require('hex-rgb');

@Component({
  selector: 'object-settings',
  templateUrl: './object-settings.html',
  styleUrls: ['./object-settings.css']
})
export class RenderSettingsComponent {

  private _resolutionWidth: number
  private _resolutionHeight: number

  constructor(public settingsService: SettingsService) {
    settingsService.resolutionSub.asObservable().subscribe((res: GLM.IArray) => {
      this._resolutionWidth = res[0]
      this._resolutionHeight = res[1]
    })
  }

  resolutionUpdate() {
    this.settingsService.resolutionSub.next([this._resolutionWidth, this._resolutionHeight])
  }

  zoomSliderUpdate(event) {
    this.settingsService.zoom = event.value / 100.0
  }

}