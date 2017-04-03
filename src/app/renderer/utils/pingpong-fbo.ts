import Shader from "./shader";
import RenderTarget from "./render-target";
import {gl} from "./render-context";

export default class PingPongFBO extends RenderTarget {
  private _textures: WebGLTexture[];
  private _textureData: Uint8Array;
  private _currentTexture: number;
  private _framebuffer: WebGLFramebuffer;

  constructor(shader: Shader, sizeX: number, sizeY: number) {
    super(shader, sizeX, sizeY);
    this.resetTextures();
    this._framebuffer = gl.createFramebuffer();
  }

  public render() {
    gl.viewport(0, 0, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this._program);

    gl.enableVertexAttribArray(this._positionAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
    gl.vertexAttribPointer(this._positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(this._texCoordAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
    gl.vertexAttribPointer(this._texCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._textures[this._currentTexture], 0);

    this._shader.update();

    gl.drawArrays(gl.TRIANGLES, 0, 6)

    gl.readPixels(0, 0, this.sizeX, this.sizeY, gl.RGBA, gl.UNSIGNED_BYTE, this._textureData);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this._currentTexture = 1 - this._currentTexture;
  }

  public resetTextures() {
    this._textures = [];

    this._textures.push(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_2D, this._textures[0]);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._textures.push(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_2D, this._textures[1]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._currentTexture = 0;

    this._textureData = new Uint8Array(this.sizeX * this.sizeY * 4);
  }

  get texture(): WebGLTexture { return this._textures[1 - this._currentTexture] }
  get lastTexture(): WebGLTexture { return this._textures[1 - this._currentTexture] }
  get textureData(): Uint8Array { return this._textureData }
}