import Shader from "../utils/shader";
import RenderTarget from "../utils/render-target";
import {FLOAT_TYPE} from "../utils/shader";
import {TEXTURE_TYPE} from "../utils/shader";
import {IUniform} from "../utils/shader";

/*
 Shader imports
 */
const baseRendererVert = require('raw-loader!glslify-loader!./shaders/baseRenderer.vert');
const baseRendererFrag = require('raw-loader!glslify-loader!./shaders/baseRenderer.frag');

export default class RenderView {
  private _renderTarget: RenderTarget;
  private _uniforms: {[name: string]: IUniform};

  constructor() {
    let shader = new Shader(baseRendererVert, baseRendererFrag);
    this._uniforms = {
      u_time: { type: FLOAT_TYPE, value: 0.0 },
      u_texture: { type: TEXTURE_TYPE, value: null }
    };
    shader.uniforms = this._uniforms;

    this._renderTarget = new RenderTarget(shader, 512, 512);
  }

  public render(pathTracerTexture: WebGLTexture) {

    this._uniforms['u_time'].value += 0.01;
    this._uniforms['u_texture'].value = pathTracerTexture;

    this._renderTarget.render();
  }
}