import {Component} from "@angular/core";
import {SettingsService} from "../../renderer/settings/settings.service";

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.css']
})
export class TopBarComponent {
  constructor(public settingsService: SettingsService) {}
}