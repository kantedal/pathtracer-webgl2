import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {RenderService} from "../renderer/render.service";
import {SceneService} from "../renderer/scene.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('renderCanvas') renderCanvas: ElementRef

  constructor(
    public renderService: RenderService,
    public sceneService: SceneService
  ) {}

  ngAfterViewInit(): void {
    this.renderService.init(this.renderCanvas)
  }
}
