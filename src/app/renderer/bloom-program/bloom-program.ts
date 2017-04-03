/*
 Shader imports
 */
import Shader from "../utils/shader";
const thresholdFrag = require('raw-loader!glslify!./shaders/threshold.frag');
const thresholdVert = require('raw-loader!glslify!./shaders/threshold.vert');
const bloomVerticalFrag = require('raw-loader!glslify!./shaders/bloom-vertical.frag');
const bloomHorizontalFrag = require('raw-loader!glslify!./shaders/bloom-horizontal.frag');
const bloomVert = require('raw-loader!glslify!./shaders/bloom.vert');

export class BloomProgram {
  private _thresholdShader: Shader
  private _verticalBloomShader: Shader
  private _horizontalBloomShader: Shader

  constructor() {
    this._thresholdShader = new Shader(thresholdFrag, thresholdVert);
    this._thresholdShader.uniforms = {}

    this._verticalBloomShader = new Shader(bloomHorizontalFrag, bloomVert);
    this._verticalBloomShader.uniforms = {}

    this._horizontalBloomShader = new Shader(bloomVerticalFrag, bloomVert);
    this._horizontalBloomShader.uniforms = {}
  }

  render(texture: WebGLTexture) {

  }
}