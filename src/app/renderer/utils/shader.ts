import {gl} from "./render-context";

export interface IUniform {
  value: any;
  type: number;
  location?: WebGLUniformLocation;
}

export const FLOAT_TYPE = 0;
export const INTEGER_TYPE = 1;
export const VEC2_TYPE = 2;
export const VEC3_TYPE = 3;
export const VEC4_TYPE = 4;
export const TEXTURE_TYPE = 5;

export default class Shader {
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;
  private _program: WebGLProgram;
  private _uniforms: {[name: string]: IUniform};
  needsUpdate: boolean = false

  constructor(vertexSource: string, fragmentSource: string) {
    this._vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
    this._fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
    this._uniforms = {};
  }

  public update() {
    let textureCount = 0;

    for (let uniformName in this._uniforms) {
      let uniform = this._uniforms[uniformName];
      switch (uniform.type) {
        case FLOAT_TYPE:
          gl.uniform1f(uniform.location, uniform.value);
          break;
        case VEC2_TYPE:
          gl.uniform2fv(uniform.location, uniform.value);
          break;
        case VEC3_TYPE:
          gl.uniform3fv(uniform.location, uniform.value);
          break;
        case INTEGER_TYPE:
          gl.uniform1i(uniform.location, uniform.value);
          break;
        case TEXTURE_TYPE:

          gl.uniform1i(uniform.location, textureCount);

          switch (textureCount) {
            case 0:
              gl.activeTexture(gl.TEXTURE0);
              break;
            case 1:
              gl.activeTexture(gl.TEXTURE1);
              break;
            case 2:
              gl.activeTexture(gl.TEXTURE2);
              break;
            case 3:
              gl.activeTexture(gl.TEXTURE3);
              break;
            case 4:
              gl.activeTexture(gl.TEXTURE4);
              break;
            case 5:
              gl.activeTexture(gl.TEXTURE5);
              break;
            case 6:
              gl.activeTexture(gl.TEXTURE6);
              break;
            case 7:
              gl.activeTexture(gl.TEXTURE7);
              break;
            case 8:
              gl.activeTexture(gl.TEXTURE8);
              break;
            case 9:
              gl.activeTexture(gl.TEXTURE9);
              break;
            case 10:
              gl.activeTexture(gl.TEXTURE10);
              break;
          }
          gl.bindTexture(gl.TEXTURE_2D, uniform.value);
          textureCount++;
          break;
      }
    }
  }

  public updateTexture(data) {

  }

  private createShader(type: number, source: string): WebGLShader {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    }

    console.warn(gl.getShaderInfoLog(shader))
    //console.warn(gl.getShaderSource(shader))
    //console.debug(gl.getShaderSource(shader))
    gl.deleteShader(shader)
  }

  private updateUniforms() {
    if (this._program) {
      for (let name in this._uniforms) {
        let uniform = this._uniforms[name];
        uniform.location = gl.getUniformLocation(this._program, name);
      }
    }
  }

  public setUniform(id: string, data: IUniform) {
    this._uniforms[id] = data
    this.updateUniforms()
    this.needsUpdate = true
  }

  set uniforms(value: {[p: string]: IUniform}) {
    this._uniforms = value;
    this.updateUniforms();
  }

  set program(value: WebGLProgram) {
    this._program = value;
    this.updateUniforms();
  }

  get fragmentShader(): WebGLShader { return this._fragmentShader; }
  get vertexShader(): WebGLShader { return this._vertexShader; }
}
