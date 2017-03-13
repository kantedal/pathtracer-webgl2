import {gl} from "./render-context";

interface IUniform {
  value: any | WebGLTexture;
  type: string;
  location?: WebGLUniformLocation;
}

export default class Shader {
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;
  private _program: WebGLProgram;
  private _uniforms: {[name: string]: IUniform};

  constructor(vertexSource: string, fragmentSource: string) {
    this._vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
    this._fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
    this._uniforms = {};
  }

  public update() {
    for (let uniformName in this._uniforms) {
      let uniform = this._uniforms[uniformName];
      let textureCount = 0;

      switch (uniform.type) {
        case 'f':
          gl.uniform1f(uniform.location, uniform.value);
          break;
        case 'v2':
          gl.uniform2fv(uniform.location, uniform.value);
          break;
        case 't':

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
      }
    }
  }

  private createShader(type: number, source: string): WebGLShader {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  private updateUniforms() {
    if (this._program) {
      for (let name in this._uniforms) {
        let uniform = this._uniforms[name];
        uniform.location = gl.getUniformLocation(this._program, name);
      }
    }
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