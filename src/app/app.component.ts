import {Component, AfterViewInit, ViewChild, ElementRef, AfterViewChecked, AfterContentInit} from '@angular/core';
import {RenderService} from "./renderer/render.service";
import {SettingsService} from "./renderer/settings/settings.service";
import {SceneService} from "./renderer/scene.service";
import {MdDialog} from "@angular/material";
import {LoadingDialogComponent} from "./components/loading-dialog/loading-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterContentInit {
  @ViewChild('renderCanvas') renderCanvas: ElementRef

  constructor(
    public renderService: RenderService,
    public settingsService: SettingsService,
    public sceneService: SceneService,
    public dialog: MdDialog
  ) {}

  ngAfterViewInit(): void {
    this.renderCanvas.nativeElement.oncontextmenu = (e) => e.preventDefault()
    this.renderService.init(this.renderCanvas)
  }

  ngAfterContentInit(): void {
  }
}
