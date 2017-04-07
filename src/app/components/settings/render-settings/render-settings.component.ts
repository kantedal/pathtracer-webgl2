import {Component, ElementRef} from "@angular/core";
import {SettingsService} from "../../../renderer/settings/settings.service";
import {RenderService} from "../../../renderer/render.service";
const hexRgb = require('hex-rgb');

@Component({
  selector: 'render-options',
  templateUrl: 'render-settings.html',
  styleUrls: ['render-settings.css']
})
export class RenderSettingsComponent {
  renderTypes = [{ id: 0, name: 'Ray tracing' }, { id: 1, name: 'Ray marching' }]
  renderType = 0

  private _resolutionWidth: number
  private _resolutionHeight: number

  constructor(
    public settingsService: SettingsService,
    public renderService: RenderService
  ) {
    settingsService.resolutionSub.asObservable().subscribe((res: GLM.IArray) => {
      this._resolutionWidth = res[0]
      this._resolutionHeight = res[1]
    })
  }

  resolutionUpdate() {
    this.settingsService.resolutionSub.next([this._resolutionWidth, this._resolutionHeight])
  }

  zoomSliderUpdate(event) {
    this.settingsService.zoom = event.value / 100.0
  }

  downloadImage() {
    // Create a 2D canvas to store the result
    let canvas = document.createElement('canvas');
    canvas.width = this._resolutionWidth;
    canvas.height = this._resolutionHeight;
    let context = canvas.getContext('2d');

    let textureData = new Uint8ClampedArray(this._resolutionWidth * this._resolutionHeight * 4);
    for (let x = 0; x < this._resolutionWidth; x++) {
      for (let y = 0; y < this._resolutionHeight; y++) {
        textureData[this._resolutionWidth * this._resolutionHeight * 4 - 4 * (y + x * this._resolutionWidth)] = this.renderService.textureData[4 * (y + x * this._resolutionWidth)]
        textureData[this._resolutionWidth * this._resolutionHeight * 4 - 4 * (y + x * this._resolutionWidth) + 1] = this.renderService.textureData[4 * (y + x * this._resolutionWidth) + 1]
        textureData[this._resolutionWidth * this._resolutionHeight * 4 - 4 * (y + x * this._resolutionWidth) + 2] = this.renderService.textureData[4 * (y + x * this._resolutionWidth) + 2]
        textureData[this._resolutionWidth * this._resolutionHeight * 4 - 4 * (y + x * this._resolutionWidth) + 3] = this.renderService.textureData[4 * (y + x * this._resolutionWidth) + 3]
      }
    }

    // Copy the pixels to a 2D canvas
    let imageData = context.createImageData(this._resolutionWidth, this._resolutionHeight);
    imageData.data.set(textureData);
    context.putImageData(imageData, 0, 0);

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
