import Shader from "../utils/shader";
import {FLOAT_TYPE} from "../utils/shader";
import {TEXTURE_TYPE} from "../utils/shader";
import FBO from "../utils/fbo";
import {SettingsService} from "../settings/settings.service";
import {VEC2_TYPE} from "../utils/shader";


/*
 Shader imports
 */
const thresholdFrag = require('raw-loader!glslify!./shaders/threshold.frag');
const thresholdVert = require('raw-loader!glslify!./shaders/threshold.vert');
const bloomVerticalFrag = require('raw-loader!glslify!./shaders/bloom-vertical.frag');
const bloomHorizontalFrag = require('raw-loader!glslify!./shaders/bloom-horizontal.frag');
const bloomVert = require('raw-loader!glslify!./shaders/bloom.vert');

export class BloomProgram {
  private _thresholdProgram: FBO
  private _thresholdShader: Shader

  private _verticalBloomProgram: FBO
  private _verticalBloomShader: Shader

  private _horizontalBloomProgram: FBO
  private _horizontalBloomShader: Shader

  constructor(public settingsService: SettingsService) {
    let renderSize = settingsService.resolutionSub.getValue()

    this._thresholdShader = new Shader(thresholdVert, thresholdFrag);
    this._thresholdShader.uniforms = {
      u_buffer_texture: { type: TEXTURE_TYPE, value: null }
    }
    this._thresholdProgram = new FBO(this._thresholdShader, renderSize[0], renderSize[1])

    this._verticalBloomShader = new Shader(bloomVert, bloomHorizontalFrag)
    this._verticalBloomShader.uniforms = {
      u_resolution: { type: VEC2_TYPE, value: settingsService.resolutionSub.getValue() },
      u_buffer_texture: { type: TEXTURE_TYPE, value: null },
    }
    this._verticalBloomProgram = new FBO(this._verticalBloomShader, renderSize[0], renderSize[1])

    this._horizontalBloomShader = new Shader(bloomVert, bloomVerticalFrag)
    this._horizontalBloomShader.uniforms = {
      u_resolution: { type: VEC2_TYPE, value: settingsService.resolutionSub.getValue() },
      u_buffer_texture: { type: TEXTURE_TYPE, value: null },
    }
    this._horizontalBloomProgram = new FBO(this._horizontalBloomShader, renderSize[0], renderSize[1])

    settingsService.resolutionSub.asObservable().subscribe((resolution: GLM.IArray) => {
      this._thresholdProgram.resize(resolution[0], resolution[1])
      this._verticalBloomProgram.resize(resolution[0], resolution[1])
      this._horizontalBloomProgram.resize(resolution[0], resolution[1])

      this._verticalBloomShader.uniforms['u_resolution'].value = resolution
      this._horizontalBloomShader.uniforms['u_resolution'].value = resolution
    })
  }

  render(texture: WebGLTexture) {
    let currentTexture = texture

    this._thresholdShader.uniforms['u_buffer_texture'].value = currentTexture;
    this._thresholdProgram.render()
    currentTexture = this._thresholdProgram.texture

    let bloomIterations = this.settingsService.bloomSettings.getAttribute('u_bloomIterations').value
    for (let i = 0; i < bloomIterations; i++) {
      this._verticalBloomShader.uniforms['u_buffer_texture'].value = currentTexture;
      this._verticalBloomProgram.render()

      this._horizontalBloomShader.uniforms['u_buffer_texture'].value = this._verticalBloomProgram.texture
      this._horizontalBloomProgram.render()

      currentTexture = this._horizontalBloomProgram.texture
    }
  }

  get renderTexture(): WebGLTexture { return this._horizontalBloomProgram.texture }
}