
export default class DataTexture {
  private _texture: WebGLTexture;

  constructor(private _gl: WebGL2RenderingContext) {
    this.resetTexture();
  }

  public resetTexture() {
    this._texture = this._gl.createTexture();
    this._gl.activeTexture(this._gl.TEXTURE0);
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
    this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, 1);
    this._gl.texParameterf(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
    this._gl.texParameterf(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
    this._gl.texParameterf(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
    this._gl.texParameterf(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGB, 512, 512, 0, this._gl.RGB, this._gl.FLOAT, null);
  }
}