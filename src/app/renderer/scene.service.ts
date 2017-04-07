import {Injectable, ElementRef} from "@angular/core";
import Camera from "./path-tracer/models/camera";
import Scene from "./path-tracer/models/scene";
import {createDefaultScene1} from "./path-tracer/models/default-scenes/default-scenes";
import {ISceneTextures, default as buildScene} from "./path-tracer/models/scene-builder";

@Injectable()
export class SceneService {
  private _scene: Scene;
  private _camera: Camera;

  constructor() {}

  public init(renderCanvas: ElementRef) {
    this._scene = new Scene();
    this._camera = new Camera(vec3.fromValues(10.90, 3.51, 4.00), vec3.fromValues(1.59, 3.79, 2.27))
  }

  public loadScene(): Promise<ISceneTextures> {
    return createDefaultScene1(this._scene).then(() => buildScene(this._scene))
  }

  get camera(): Camera { return this._camera; }
  get scene(): Scene { return this._scene; }
}