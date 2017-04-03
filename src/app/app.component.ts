import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {RenderService} from "./renderer/render.service";
import {SettingsService} from "./renderer/settings/settings.service";

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
  ) {}

  ngAfterViewInit(): void {
    this.renderCanvas.nativeElement.oncontextmenu = (e) => e.preventDefault()
    this.renderService.init(this.renderCanvas)
  }
}
