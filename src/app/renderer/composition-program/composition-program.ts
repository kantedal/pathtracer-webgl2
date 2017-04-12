import {SettingsService} from "../settings/settings.service";
import FBO from "../utils/fbo";
import Shader from "../utils/shader";
import {TEXTURE_TYPE} from "../utils/shader";
import {ISettingAttribute} from "../settings/setting";

/*
 Shader imports
 */
const compositionFrag = require('raw-loader!glslify!./shaders/composition.frag');
const compositionVert = require('raw-loader!glslify!./shaders/composition.vert');

export class CompositionProgram {
  private _compositionProgram: FBO
  private _compositionShader: Shader

  constructor(settingsService: SettingsService) {
    let renderSize = settingsService.renderSettings.getAttribute('resolution').value

    this._compositionShader = new Shader(compositionVert, compositionFrag);
    this._compositionShader.uniforms = {
      u_mainTexture: { type: TEXTURE_TYPE, value: null },
      u_bloomTexture: { type: TEXTURE_TYPE, value: null }
    }
    this._compositionProgram = new FBO(this._compositionShader, renderSize[0], renderSize[1])
    this._compositionProgram.enableWriteToTexture();

    settingsService.connectShader(this._compositionShader)
    settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe((attr: ISettingAttribute) => {
      let res = attr.value
      this._compositionProgram.resize(res[0], res[1])
    })
  }

  render(mainTexture: WebGLTexture, bloomTexture: WebGLTexture) {
    this._compositionShader.uniforms['u_mainTexture'].value = mainTexture
    this._compositionShader.uniforms['u_bloomTexture'].value = bloomTexture
    this._compositionProgram.render()
  }

  get renderTexture(): WebGLTexture { return this._compositionProgram.texture }
  get textureData(): Uint8Array { return this._compositionProgram.textureData }
}