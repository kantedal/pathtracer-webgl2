import {Injectable, ElementRef} from "@angular/core"
import {initContext} from "./utils/render-context"
import RenderView from "./render-view/render-view"
import PathTracer from "./path-tracer/path-tracer"
import {SceneService} from "./scene.service";
import {ISceneTextures} from "./path-tracer/models/scene-builder";
const Stats = require('stats-js');


@Injectable()
export class RenderService {
  private _pathTracer: PathTracer
  private _renderView: RenderView
  private _stats: any;

  constructor(public sceneService: SceneService) {}

  public init(canvas: ElementRef) {
    initContext(canvas)

    this._stats = new Stats()
    this._stats.setMode(0)
    this._stats.domElement.style.position = 'absolute'
    this._stats.domElement.style.right = '0px'
    this._stats.domElement.style.top = '0px'
    document.body.appendChild(this._stats.domElement)

    this.sceneService.init(canvas)
    this.sceneService.loadScene().then((sceneTextures: ISceneTextures) => {
      this._pathTracer = new PathTracer(this.sceneService, sceneTextures)
      this._renderView = new RenderView()

      this.render()
    });
  }

  private render = () => {
    this._stats.begin();

    this._pathTracer.render()
    this._renderView.render(this._pathTracer.renderTexture)

    requestAnimationFrame(this.render)

    this._stats.end();
  }
}