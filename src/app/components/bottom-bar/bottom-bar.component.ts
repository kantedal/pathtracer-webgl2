import {Component, ViewChild} from "@angular/core";
import {SettingsService} from "../../renderer/settings/settings.service";

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
}