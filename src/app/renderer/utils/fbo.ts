import Shader from "./shader";
import RenderTarget from "./render-target";
import {gl} from "./render-context";

export default class FBO extends RenderTarget {
  private _texture: WebGLTexture;
  private _framebuffer: WebGLFramebuffer;

  constructor(shader: Shader, sizeX: number, sizeY: number) {
    super(shader, sizeX, sizeY);
    this.resetTexture();
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
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);

    this._shader.update();

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  public resetTexture() {
    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.sizeX, this.sizeY, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  public resize(sizeX: number, sizeY: number) {
    this.setWindowSize(sizeX, sizeY)
    this.resetTexture()
  }

  get texture(): WebGLTexture { return this._texture; }
}