import {Injectable, ElementRef} from "@angular/core";
import {initContext} from "./utils/render-context";
import RenderView from "./render-view/render-view";
import PathTracer from "./path-tracer/path-tracer";

@Injectable()
export class RenderService {
  private _pathTracer: PathTracer;
  private _renderView: RenderView;

  constructor() {}

  public init(canvas: ElementRef) {
    initContext(canvas);

    this._pathTracer = new PathTracer();
    this._renderView = new RenderView();
  }

  private render = () => {
    this._pathTracer.render();
    this._renderView.render(this._pathTracer.renderTexture);

    requestAnimationFrame(this.render);
  }
}