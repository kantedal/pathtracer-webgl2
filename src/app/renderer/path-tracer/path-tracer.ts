import Shader, {IUniform, TEXTURE_TYPE, FLOAT_TYPE, INTEGER_TYPE, VEC2_TYPE, VEC3_TYPE} from "../utils/shader";
import PingPongFBO from "../utils/pingpong-fbo";
import {SettingsService} from "../../services/settings.service";
import Camera from "./models/camera";
import {CameraNavigator} from "../camera-navigator";
import {gl} from "../utils/render-context";

/*
 Shader imports
 */
const pathTracerVert = require('raw-loader!glslify!./shaders/path-tracer.vert');
//const pathTracerFrag = require('raw-loader!glslify-loader!./shaders/path-tracer.frag');
const pathTracerFrag = require('raw-loader!./shaders/output.glsl');

export default class PathTracer {
  private _camera: Camera
  private _navigator: CameraNavigator
  private _frameBuffer: PingPongFBO
  private _pathTracerUniforms: {[name: string]: IUniform}
  private _refreshScreen: boolean

  constructor(private _settingsService: SettingsService) {
    this._camera = new Camera(vec3.fromValues(-2,0,0), vec3.fromValues(1,0,0))
    this._navigator = new CameraNavigator(this._camera, _settingsService)

    let pathTracerShader = new Shader(pathTracerVert, pathTracerFrag);
    this._pathTracerUniforms = {
      u_accumulated_texture: { type: TEXTURE_TYPE, value: null },
      u_dome_texture: { type: TEXTURE_TYPE, value: null},
      
      // Uniforms
      time: { type: FLOAT_TYPE, value: 1.0 },
      samples: { type: FLOAT_TYPE, value: 0.0 },
      trace_depth: { type: INTEGER_TYPE, value: 3 },
      global_lightning_enabled: { type: FLOAT_TYPE, value: 0.0 },
      resolution: { type: VEC2_TYPE, value: [512, 512] },

      // Fractal uniforms
      u_power: { type: FLOAT_TYPE, value: 10.0 },
      u_bailout: { type: FLOAT_TYPE, value: 10.0 },
      u_minDistance: { type: FLOAT_TYPE, value: 0.001 },

      // Camera
      camera_position: { type: VEC3_TYPE, value: this._camera.position },
      camera_direction: { type: VEC3_TYPE, value: this._camera.direction },
      camera_right: { type: VEC3_TYPE, value: this._camera.camera_right },
      camera_up: { type: VEC3_TYPE, value: this._camera.camera_up },
    };
    pathTracerShader.uniforms = this._pathTracerUniforms

    let lightSphereImage = new Image();
    lightSphereImage.onload = () => {
      let lightSphereTexture = gl.createTexture();
      let lightSphereLocation = gl.getUniformLocation(this._frameBuffer._program, "u_dome_texture");

      gl.useProgram(this._frameBuffer._program);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, lightSphereTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, lightSphereImage);
      gl.uniform1i(lightSphereLocation, 2);
      gl.bindTexture(gl.TEXTURE_2D, null);

      this._pathTracerUniforms['u_dome_texture'].value = lightSphereTexture
    }
    lightSphereImage.src = "./assets/dome.jpg";

    this._frameBuffer = new PingPongFBO(pathTracerShader, 512, 512)

    this._settingsService.resolutionObservable.subscribe((resolution: GLM.IArray) => {
      this._pathTracerUniforms['resolution'].value = resolution
      this._frameBuffer.setWindowSize(resolution[0], resolution[1])
      this._frameBuffer.resetTextures()
      this._refreshScreen = true
    })

    this._settingsService.powerObservable.subscribe(power => {
      this._pathTracerUniforms['u_power'].value = power
      this._refreshScreen = true
    })
    this._settingsService.detailLevelObservable.subscribe(val => {
      this._pathTracerUniforms['u_minDistance'].value = 1 / val
      this._refreshScreen = true
    })

    this._refreshScreen = false
  }

  public render() {
    this._pathTracerUniforms['u_accumulated_texture'].value = this._frameBuffer.texture

    this._pathTracerUniforms['camera_position'].value = this._camera.position
    this._pathTracerUniforms['camera_direction'].value = this._camera.direction
    this._pathTracerUniforms['camera_right'].value = this._camera.camera_right
    this._pathTracerUniforms['camera_up'].value = this._camera.camera_up

    this._frameBuffer.render();

    if (this._camera.hasChanged || this._refreshScreen ) {
      this._pathTracerUniforms['samples'].value = 0.0
      this._camera.hasChanged = false
      this._refreshScreen = false
    }
    else {
      this._pathTracerUniforms['samples'].value += 1.0
    }
    this._pathTracerUniforms['time'].value += 0.01
  }

  get renderTexture(): WebGLTexture { return this._frameBuffer.texture; }
}