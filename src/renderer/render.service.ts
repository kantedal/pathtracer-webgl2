import {Injectable, ElementRef} from "@angular/core";
import {initContext} from "./utils/render-context";
import RenderView from "./render-view/render-view";

@Injectable()
export class RenderService {
  private _renderView: RenderView;

  constructor() {}

  public init(canvas: ElementRef) {
    initContext(canvas);
    this._renderView = new RenderView();
  }
}