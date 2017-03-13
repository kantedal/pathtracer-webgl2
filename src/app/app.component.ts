import {Component, AfterViewInit} from '@angular/core';
import {RenderService} from "../renderer/render.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  title = 'app works!';
  constructor(public renderService: RenderService) {}


}
