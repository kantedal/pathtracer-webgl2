import {ElementRef} from "@angular/core";
/**
 * Created by fille on 2017-03-13.
 */

export let gl: WebGL2RenderingContext;

export function initContext(canvas: ElementRef) {
  gl = canvas.nativeElement.getContext('webgl2', { antialias: false });
  gl.getExtension('EXT_color_buffer_float');
}