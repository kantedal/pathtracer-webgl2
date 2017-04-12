import {Component, ElementRef} from "@angular/core";
import {SettingsService} from "../../../renderer/settings/settings.service";
import {RenderService} from "../../../renderer/render.service";
import {BehaviorSubject} from "rxjs";
import {ISettingAttribute} from "../../../renderer/settings/setting";
const hexRgb = require('hex-rgb');

@Component({
  selector: 'render-options',
  templateUrl: 'render-settings.html',
  styleUrls: ['render-settings.css']
})
export class RenderSettingsComponent {
  renderTypes = [{ id: 0, name: 'Ray tracing' }, { id: 1, name: 'Ray marching' }]
  renderType = 0

  resolutionSub: BehaviorSubject<ISettingAttribute>

  constructor(
    public settingsService: SettingsService,
    public renderService: RenderService
  ) {
    this.resolutionSub = settingsService.renderSettings.getAttributeSub('resolution')
  }

  zoomSliderUpdate(event) {
    this.settingsService.zoom = event.value / 100.0
  }

  downloadImage() {
    // Create a 2D canvas to store the result
    let w = this.resolutionSub.getValue().value[0]
    let h = this.resolutionSub.getValue().value[1]
    let canvas = document.createElement('canvas');
    canvas.width = w
    canvas.height = h
    let context = canvas.getContext('2d');

    console.log(w, h)

    let textureData = new Uint8ClampedArray(w * h * 4);

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        textureData[4 * (w * x + y) + 0] = this.renderService.textureData[4 * (w * (w - x) + y) + 0]
        textureData[4 * (w * x + y) + 1] = this.renderService.textureData[4 * (w * (w - x) + y) + 1]
        textureData[4 * (w * x + y) + 2] = this.renderService.textureData[4 * (w * (w - x) + y) + 2]
        textureData[4 * (w * x + y) + 3] = this.renderService.textureData[4 * (w * (w - x) + y) + 3]
      }
    }

    // Copy the pixels to a 2D canvas
    let imageData = context.createImageData(w, h);
    imageData.data.set(textureData);
    context.putImageData(imageData, 0, 0)

    let download = document.createElement('a');
    download.href = canvas.toDataURL()
    download.download = 'pathtracer-image.png';
    download.click();
  }

  imageUpload(event) {
    let image = new Image()
    let reader = new FileReader()

    reader.onload = (e: any) => {
      image.src = e.target.result
      this.renderService.newDomeImage(e.target.result)
    }

    reader.readAsDataURL(event.target.files[0]);
  }

}
