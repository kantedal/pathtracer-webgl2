import {Component} from "@angular/core";
import {SettingsService} from "../../renderer/settings/settings.service";
const hexRgb = require('hex-rgb');

@Component({
  selector: 'render-options',
  templateUrl: './render-options.html',
  styleUrls: ['./render-options.css']
})
export class RenderOptionsComponent {
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