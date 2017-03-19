import {Injectable, ElementRef} from "@angular/core";
import {initContext} from "./utils/render-context";
import RenderView from "./render-view/render-view";
import PathTracer from "./path-tracer/path-tracer";
import {SceneService} from "./scene.service";
import {ISceneTextures} from "./path-tracer/models/scene-builder";
import * as moment from "moment";
import {SettingsService} from "../services/settings.service";
const Stats = require('stats-js');


@Injectable()
export class RenderService {
  private _pathTracer: PathTracer
  private _renderView: RenderView
  private _stats: any;

  // Used for timing
  private _startTime: number;
  private _samples: number = 0;

  constructor(
    public sceneService: SceneService,
    public settingsService: SettingsService
  ) {}

  public init(canvas: ElementRef) {
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
    this._stats.domElement.style.right = '0px'
    this._stats.domElement.style.top = '0px'
    document.body.appendChild(this._stats.domElement)

    this.sceneService.init(canvas)
    this.sceneService.loadScene().then((sceneTextures: ISceneTextures) => {
      this._pathTracer = new PathTracer(this.settingsService, this.sceneService, sceneTextures)
      this._renderView = new RenderView(this.settingsService)

      this._startTime = moment().valueOf();
      this.render()
    });
  }

  private render = () => {
    this._stats.begin();

    this._pathTracer.render()
    this._renderView.render(this._pathTracer.renderTexture)

    this._stats.end();

    // this._samples++;
    // if (this._samples == 300) {
    //   console.log('Time for 300 samples: ', moment().valueOf() - this._startTime, 'ms');
    // }
    // else {
      requestAnimationFrame(this.render)
    //}
  }
}