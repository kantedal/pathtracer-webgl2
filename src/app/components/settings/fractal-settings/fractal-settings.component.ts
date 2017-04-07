import {Component} from "@angular/core";
import {SettingsService} from "../../../renderer/settings/settings.service";
const hexRgb = require('hex-rgb');

@Component({
  selector: 'fractal-settings',
  templateUrl: 'fractal-settings.html',
  styleUrls: ['fractal-settings.css']
})
export class FractalSettingsComponent {
  materials = [{ id: 0, name: 'Diffuse' }, { id: 5, name: 'Glossy' },  { id: 1, name: 'Specular' }, { id: 2, name: 'Transmission' }]
  selelectedMaterial: number = 0
  materialColor: string = '#ffffff'

  fractals = [{ id: 0, name: 'Mandelbulb' }, { id: 1, name: 'Mengersponge' }]

  constructor(public settingsService: SettingsService) {
  }

  powerUpdate(event) {
    this.settingsService.power = event.value
  }

  detailLevelUpdate(event) {
    this.settingsService.detailLevel = event.value
  }

  maxIterationsUpdate(event) {
    this.settingsService.maxIterations = event.value
  }

  materialTypeChange(event) {
    this.settingsService.materialType = this.selelectedMaterial
  }

  materialColorChanged(event) {
    let color = hexRgb(event);
    this.settingsService.materialColor = vec3.fromValues(color[0] / 255, color[1] / 255, color[2] / 255)
  }
}