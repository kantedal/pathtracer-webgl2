import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {RenderService} from "./renderer/render.service";
import {SceneService} from "./renderer/scene.service";
import {SettingsService} from "./services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('renderCanvas') renderCanvas: ElementRef

  constructor(
    public renderService: RenderService,
    public settingsService: SettingsService,
    public sceneService: SceneService
  ) {}

  ngAfterViewInit(): void {
    this.renderService.init(this.renderCanvas)
  }
}
