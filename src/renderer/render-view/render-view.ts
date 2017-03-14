import Shader from "../utils/shader";
import RenderTarget, {IUniform} from "../utils/render-target";
import PingPongFBO from "../utils/pingpong-fbo";

/*
 Shader imports
 */
const baseRendererVert = require('raw-loader!glslify-loader!./shaders/baseRenderer.vert');
const baseRendererFrag = require('raw-loader!glslify-loader!./shaders/baseRenderer.frag');

const pongpongVert = require('raw-loader!glslify-loader!./shaders/ping-pong.vert');
const pongpongFrag = require('raw-loader!glslify-loader!./shaders/ping-pong.frag');

export default class RenderView {
  private _renderTarget: RenderTarget;
  private _uniforms: {[name: string]: IUniform};

  private _mousePos: number[];
  private _pingPongTest: PingPongFBO;
  private _pingPongUniforms: {[name: string]: IUniform};

  constructor() {
    let shader = new Shader(baseRendererVert, baseRendererFrag);
    this._uniforms = {
      u_time: { type: 'f', value: 0.0 },
      u_texture: { type: 't', value: null }
    };
    shader.uniforms = this._uniforms;

    this._mousePos = [0,0];
    document.onmousemove = (e) => {
      this._mousePos[0] = e.pageX;
      this._mousePos[1] = e.pageY;
    };

    this._renderTarget = new RenderTarget(shader, 512, 512);

    let pingPongShader = new Shader(pongpongVert, pongpongFrag);
    this._pingPongUniforms = {
      u_last_texture: { type: 't', value: null },
      u_mouse: { type: 'v2', value: this._mousePos }
    };
    pingPongShader.uniforms = this._pingPongUniforms;

    this._pingPongTest = new PingPongFBO(pingPongShader, 512, 512);
  }

  public render(pathTracerTexture: WebGLTexture) {
    this._pingPongTest.render();
    this._pingPongUniforms['u_last_texture'].value = this._pingPongTest.texture;

    this._uniforms['u_time'].value += 0.01;
    this._uniforms['u_texture'].value = this._pingPongTest.texture;

    this._renderTarget.render();
  }
}