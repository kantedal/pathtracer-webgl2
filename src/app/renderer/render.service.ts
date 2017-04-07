import {Injectable, ElementRef} from "@angular/core";
import {initContext} from "./utils/render-context";
import RenderView from "./render-view/render-view";
import RayMarcher from "./path-tracer/ray-marcher";
import RayTracer from "./path-tracer/ray-tracer";
import * as moment from "moment";
import {SettingsService} from "./settings/settings.service";
import {BloomProgram} from "./bloom-program/bloom-program";
import {CompositionProgram} from "./composition-program/composition-program";
import {SceneService} from "./scene.service";
import {ISceneTextures} from "./path-tracer/models/scene-builder";
const Stats = require('stats-js')


@Injectable()
export class RenderService {
  private _canvas: any
  private _rayMarcher: RayMarcher
  private _rayTracer: RayTracer
  private _bloomProgram: BloomProgram
  private _compositionProgram: CompositionProgram
  private _renderView: RenderView
  private _stats: any

  // Used for timing
  private _startTime: number
  private _samples: number = 0
  private _sceneLoaded: boolean = false

  constructor(
    public settingsService: SettingsService,
    public sceneService: SceneService
  ) {}

  public init(canvas: ElementRef) {
    this._canvas = canvas
    initContext(canvas)

    canvas.nativeElement.width = window.innerWidth
    canvas.nativeElement.height = window.innerHeight

    window.onresize = () => {
      canvas.nativeElement.width = window.innerWidth
      canvas.nativeElement.height = window.innerHeight
      this._renderView.updateSize()
    }

    this._stats = new Stats()
    this._stats.setMode(0)
    this._stats.domElement.style.position = 'absolute'
    this._stats.domElement.style.left = '200px'
    this._stats.domElement.style.top = '0px'
    document.body.appendChild(this._stats.domElement)

    this.sceneService.init(canvas)
    this.sceneService.loadScene().then((sceneTextures: ISceneTextures) => {
      this._rayTracer = new RayTracer(this.settingsService, sceneTextures)
      this._startTime = moment().valueOf()
      this._sceneLoaded = true
    })

    this._rayMarcher = new RayMarcher(this.settingsService)
    this._bloomProgram = new BloomProgram(this.settingsService)
    this._compositionProgram = new CompositionProgram(this.settingsService)
    this._renderView = new RenderView(this.settingsService)
    this.render()
  }

  private render = () => {
    this._stats.begin();

    let renderTexture: WebGLTexture
    let rayTracing = this.settingsService.renderTypeSub.getValue() == 0;

    if (this._sceneLoaded) {
      if (rayTracing) {
        this._rayTracer.render()
        renderTexture = this._rayTracer.renderTexture
      }
      else {
        this._rayMarcher.render()
        renderTexture = this._rayMarcher.renderTexture
      }
    }

    if (this.settingsService.bloomSettings.getAttribute('u_bloomEnabled').value == 1.0) {
      this._bloomProgram.render(renderTexture)
    }

    this._compositionProgram.render(renderTexture, this._bloomProgram.renderTexture)
    this._renderView.render(this._compositionProgram.renderTexture)

    this._stats.end();
    requestAnimationFrame(this.render)
  }

  public newDomeImage(image: any) {
    this._rayMarcher.loadDomeTexture(image)
    this._rayTracer.loadDomeTexture(image)
  }

  get canvas(): any { return this._canvas }
  get renderTexture(): WebGLTexture { return this._compositionProgram.renderTexture }
  get textureData(): any { return this._compositionProgram.textureData }
}