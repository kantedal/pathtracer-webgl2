import Shader from "./shader";
import createProgram from "./createProgram";

export interface IUniform {
  value: any | WebGLTexture;
  type: string;
  location?: WebGLUniformLocation;
}

export default class FBO {
  private _program: WebGLProgram;
  private _positionAttribLocation: number;
  private _positionBuffer: WebGLBuffer;
  private _texCoordAttribLocation: number;
  private _texCoordBuffer: WebGLBuffer;

  constructor(
    private _gl: WebGL2RenderingContext,
    private _shader: Shader,
    private _sizeX: number,
    private _sizeY: number
  ) {
    this._program = createProgram(this._gl, this._shader);
    this._shader.program = this._program;

    let positions = new Float32Array([
      -1.0, -1.0,
      -1.0,  1.0,
      1.0, -1.0,
      -1.0,  1.0,
      1.0,  1.0,
      1.0, -1.0,
    ]);

    let texCoords = new Float32Array([
      0.0,  0.0,
      0.0,  1.0,
      1.0,  0.0,
      0.0,  1.0,
      1.0,  1.0,
      1.0,  0.0,
    ]);

    let vao = this._gl.createVertexArray();
    this._gl.bindVertexArray(vao);

    this._positionAttribLocation = this._gl.getAttribLocation(this._program, 'a_position');
    this._texCoordAttribLocation = this._gl.getAttribLocation(this._program, 'a_texCoord');

    this._positionBuffer = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
    this._gl.bufferData(this._gl.ARRAY_BUFFER, positions, this._gl.STATIC_DRAW);

    this._texCoordBuffer = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer);
    this._gl.bufferData(this._gl.ARRAY_BUFFER, texCoords, this._gl.STATIC_DRAW);

    this._gl.viewport(0, 0, this._sizeX, this._sizeY);
    this._gl.clearColor(0, 0, 0, 1);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
  }

  public render() {
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    this._gl.useProgram(this._program);

    this._gl.enableVertexAttribArray(this._positionAttribLocation);
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
    this._gl.vertexAttribPointer(this._positionAttribLocation, 2, this._gl.FLOAT, false, 0, 0);

    this._gl.enableVertexAttribArray(this._texCoordAttribLocation);
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer);
    this._gl.vertexAttribPointer(this._texCoordAttribLocation, 2, this._gl.FLOAT, false, 0, 0);

    this._shader.update();

    this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);
  }
}