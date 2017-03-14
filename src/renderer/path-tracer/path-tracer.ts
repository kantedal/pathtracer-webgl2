import Shader from "../utils/shader";
import FBO from "../utils/fbo";

/*
 Shader imports
 */
const pathTracerVert = require('raw-loader!glslify-loader!./shaders/path-tracer.vert');
const pathTracerFrag = require('raw-loader!glslify-loader!./shaders/path-tracer.frag');

export default class PathTracer {
  private _frameBuffer: FBO;

  constructor() {
    let pathTracerShader = new Shader(pathTracerVert, pathTracerFrag);
    this._frameBuffer = new FBO(pathTracerShader, 512, 512);
  }

  public render() {
    this._frameBuffer.render();
  }

  get renderTexture(): WebGLTexture { return this._frameBuffer.texture; }
}