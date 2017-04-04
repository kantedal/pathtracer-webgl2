import {Component, Input, AfterViewInit} from "@angular/core";

@Component({
  selector: 'settings-container',
  templateUrl: 'settings-container.html',
  styleUrls: ['settings-container.css']
})
export class SettingsContainerComponent {
  @Input() title: string
  @Input() expanded: any
}