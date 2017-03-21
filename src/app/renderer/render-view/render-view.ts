import Shader from "../utils/shader";
import RenderTarget from "../utils/render-target";
import {FLOAT_TYPE} from "../utils/shader";
import {TEXTURE_TYPE} from "../utils/shader";
import {IUniform} from "../utils/shader";
import {VEC2_TYPE} from "../utils/shader";
import {SettingsService} from "../settings/settings.service";

/*
 Shader imports
 */
const baseRendererVert = require('raw-loader!glslify-loader!./shaders/render-view.vert');
const baseRendererFrag = require('raw-loader!glslify-loader!./shaders/render-view.frag');

export default class RenderView {
  private _renderTarget: RenderTarget;
  private _uniforms: {[name: string]: IUniform};

  constructor(private _settingsService: SettingsService) {
    let shader = new Shader(baseRendererVert, baseRendererFrag);
    this._uniforms = {
      u_time: { type: FLOAT_TYPE, value: 0.0 },
      u_zoom: { type: FLOAT_TYPE, value: 1.0 },
      u_rendererResolution: { type: VEC2_TYPE, value: vec2.fromValues(512, 512)},
      u_resolution: { type: VEC2_TYPE, value: [window.innerWidth, window.innerHeight]},
      u_mousePosition: { type: VEC2_TYPE, value: [0.0, 0.0]},
      u_texture: { type: TEXTURE_TYPE, value: null },
    };
    shader.uniforms = this._uniforms;

    this._renderTarget = new RenderTarget(shader, window.innerWidth, window.innerHeight)

    window.onmousemove = (e) => this._uniforms['u_mousePosition'].value = [e.clientX, e.clientY]
    //window.onresize = () => this._renderTarget.setWindowSize(window.innerWidth, window.innerHeight)

    this._settingsService.zoomObservable.subscribe((value: number) => this._uniforms['u_zoom'].value = value)

    this._settingsService.resolutionObservable.subscribe((resolution: GLM.IArray) => {
      this._uniforms['u_rendererResolution'].value = resolution;
    })
  }

  public render(pathTracerTexture: WebGLTexture) {
    this._uniforms['u_time'].value += 0.01;
    this._uniforms['u_texture'].value = pathTracerTexture;
    this._uniforms['u_resolution'].value = [window.innerWidth, window.innerHeight];

    this._renderTarget.render();
  }

  public updateSize() {
    this._renderTarget.setWindowSize(window.innerWidth, window.innerHeight)
  }
}