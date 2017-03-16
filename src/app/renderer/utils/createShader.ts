
export default function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { return shader; }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}