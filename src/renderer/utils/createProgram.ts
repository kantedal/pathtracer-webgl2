
import Shader from "./shader";
export default function createProgram(gl: WebGLRenderingContext, shader: Shader): WebGLProgram {
  let program = gl.createProgram();
  gl.attachShader(program, shader.fragmentShader);
  gl.attachShader(program, shader.vertexShader);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}