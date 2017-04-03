import {ElementRef} from "@angular/core";

declare const saveAs

export let gl: WebGL2RenderingContext;

export function initContext(canvas: any) {
  gl = canvas.nativeElement.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true })

  gl.getExtension('EXT_color_buffer_float')
  gl.getExtension('OES_texture_float_linear')
}