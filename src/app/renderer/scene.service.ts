import {Injectable, ElementRef} from "@angular/core";
import Camera from "./path-tracer/models/camera";
import Scene from "./path-tracer/models/scene";
import {
  createDefaultScene1, createDefaultScene2,
  createDefaultScene4, createDefaultScene3
} from "./path-tracer/models/default-scenes/default-scenes";
import {ISceneTextures, default as buildScene} from "./path-tracer/models/scene-builder";
import {SettingsService} from "./settings/settings.service";
import {BehaviorSubject} from "rxjs";
import {ISettingAttribute} from "./settings/setting";

@Injectable()
export class SceneService {
  private _scene: Scene;
  private _camera: Camera;
  private _resolutionSub: BehaviorSubject<ISettingAttribute>

  constructor(private _settingsService: SettingsService) {}

  public init() {
    this._scene = new Scene();
    this._camera = new Camera(this._settingsService, vec3.fromValues(10.90, 3.51, 4.00), vec3.fromValues(1.59, 3.79, 2.27))
    this._resolutionSub = this._settingsService.renderSettings.getAttributeSub('resolution')

    let renderCanvas = $('#renderCanvas')
    renderCanvas.click((event) => {
      let windowSize = vec2.fromValues(window.innerWidth, window.innerHeight)
      let resolution = this._resolutionSub.getValue().value
      let zoom = this._settingsService.zoomSub.getValue()
      let clickPosition = vec2.fromValues(event.offsetX, event.offsetY)

      let windowTop = vec2.fromValues(
        windowSize[0] / 2.0 - (resolution[0] * zoom) / 2.0,
        windowSize[1] / 2.0 - (resolution[1] * zoom) / 2.0
      )

      let windowBottom = vec2.fromValues(
        windowSize[0] / 2.0 - (resolution[0] * zoom) / 2.0 + resolution[0] * zoom,
        windowSize[1] / 2.0 - (resolution[1] * zoom) / 2.0 + resolution[1] * zoom
      )

      if (clickPosition[0] > windowTop[0] && clickPosition[1] > windowTop[1] && clickPosition[0] < windowBottom[0] && clickPosition[1] < windowBottom[1]) {
        let realClickPosition = vec2.fromValues((clickPosition[0] - windowTop[0]) / zoom, resolution[1] - (clickPosition[1] - windowTop[1]) / zoom)
        let ray = this.camera.createRayFromPixel(realClickPosition)
        let selectedObject = this._scene.sceneIntersection(ray)
        this._settingsService.selectedObjectSub.next(selectedObject)
      }
    })
  }

  public loadScene(sceneId: number): Promise<ISceneTextures> {
    this._settingsService.isLoadingSub.next(true)

    switch (sceneId) {
      case 1:
        return createDefaultScene1(this._scene).then(() => {
          this._settingsService.isLoadingSub.next(false)
          return buildScene(this._scene)
        })
      case 2:
        return createDefaultScene2(this._scene).then(() => {
          this._settingsService.isLoadingSub.next(false)
          return buildScene(this._scene)
        })
      case 3:
        return createDefaultScene3(this._scene).then(() => {
          this._settingsService.isLoadingSub.next(false)
          return buildScene(this._scene)
        })
      case 4:
        return createDefaultScene4(this._scene).then(() => {
          this._settingsService.isLoadingSub.next(false)
          return buildScene(this._scene)
        })
    }

  }

  get camera(): Camera { return this._camera; }
  get scene(): Scene { return this._scene; }
}