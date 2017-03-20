import {Component, ViewChild} from "@angular/core";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'bottom-bar',
  templateUrl: './bottom-bar.html',
  styleUrls: ['./bottom-bar.css']
})
export class BottomBarComponent {
  private _resolutionWidth: number
  private _resolutionHeight: number

  constructor(public settingsService: SettingsService) {
    settingsService.resolutionObservable.subscribe((res: GLM.IArray) => {
      this._resolutionWidth = res[0]
      this._resolutionHeight = res[1]
    })
  }

  powerUpdate(event) {
    this.settingsService.power = event.value;
  }

  detailLevelUpdate(event) {
    this.settingsService.detailLevel = event.value;
  }

  zoomSliderUpdate(event) {
    this.settingsService.zoom = event.value / 100.0
  }

  resolutionUpdate() {
    this.settingsService.resolution = [this._resolutionWidth, this._resolutionHeight]
  }
}