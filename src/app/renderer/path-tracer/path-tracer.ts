import Shader, {IUniform, TEXTURE_TYPE, FLOAT_TYPE, INTEGER_TYPE, VEC2_TYPE, VEC3_TYPE} from "../utils/shader";
import PingPongFBO from "../utils/pingpong-fbo";
import {SettingsService} from "../settings/settings.service";
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
  private _pathTracerShader: Shader
  private _pathTracerUniforms: {[name: string]: IUniform}
  private _refreshScreen: boolean
  private _shouldRender = true

  constructor(private _settingsService: SettingsService) {
    this._camera = new Camera(vec3.fromValues(-2,0,0), vec3.fromValues(1,0,0))
    this._navigator = new CameraNavigator(this._camera, _settingsService)

    this._pathTracerShader = new Shader(pathTracerVert, pathTracerFrag);
    this._pathTracerUniforms = {
      u_accumulated_texture: { type: TEXTURE_TYPE, value: null },
      u_dome_texture: { type: TEXTURE_TYPE, value: null},

      // Render settings uniforms
      time: { type: FLOAT_TYPE, value: 1.0 },
      samples: { type: FLOAT_TYPE, value: 0.0 },
      trace_depth: { type: INTEGER_TYPE, value: 3 },
      global_lightning_enabled: { type: FLOAT_TYPE, value: 0.0 },
      resolution: { type: VEC2_TYPE, value: [512, 512] },

      // Fractal uniforms
      u_fractalType: { type: FLOAT_TYPE, value: 0.0 },
      u_power: { type: FLOAT_TYPE, value: 10.0 },
      u_bailout: { type: FLOAT_TYPE, value: 10.0 },
      u_minDistance: { type: FLOAT_TYPE, value: 0.001 },
      u_maxIterations: { type: FLOAT_TYPE, value: 300 },

      // Material uniforms
      u_materialType: { type: FLOAT_TYPE, value: 0.0 },
      u_materialColor: { type: VEC3_TYPE, value: [0.9, 0.9, 0.9] },

      // Camera
      u_cameraYaw: { type: FLOAT_TYPE, value: 0.0},
      u_cameraPitch: { type: FLOAT_TYPE, value: 0.0},
      camera_position: { type: VEC3_TYPE, value: this._camera.position },
      camera_direction: { type: VEC3_TYPE, value: this._camera.direction },
      camera_right: { type: VEC3_TYPE, value: this._camera.camera_right },
      camera_up: { type: VEC3_TYPE, value: this._camera.camera_up },
    };

    // Add fractal attributes
    for (let attributeSub of this._settingsService.mengerSponge.attributes) {
      let attr = attributeSub.getValue()
      this._pathTracerUniforms[attr.uniformName] = {type: attr.uniformType, value: attr.value}
      console.log(this._pathTracerUniforms)
    }

    this._pathTracerShader.uniforms = this._pathTracerUniforms

    this._settingsService.connectShader(this._pathTracerShader)

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
    lightSphereImage.src = "./assets/sky-3.jpg";

    this._frameBuffer = new PingPongFBO(this._pathTracerShader, 512, 512)
    this._refreshScreen = false

    this.setupSettingsListeners();
  }

  public render() {
    if (this._shouldRender) {
      this._frameBuffer.scaleFactor = this._settingsService.scaledDown ? 0.5 : 1.0
      this._pathTracerUniforms['resolution'].value = this._settingsService.scaledDown ? [this._frameBuffer.sizeX * 0.5, this._frameBuffer.sizeY * 0.5] : [this._frameBuffer.sizeX, this._frameBuffer.sizeY]

      this._pathTracerUniforms['u_accumulated_texture'].value = this._frameBuffer.texture

      this._pathTracerUniforms['u_cameraYaw'].value = this._camera.yawRotation
      this._pathTracerUniforms['u_cameraPitch'].value = this._camera.pitchRotation
      this._pathTracerUniforms['camera_position'].value = this._camera.position
      this._pathTracerUniforms['camera_direction'].value = this._camera.direction
      this._pathTracerUniforms['camera_right'].value = this._camera.camera_right
      this._pathTracerUniforms['camera_up'].value = this._camera.camera_up

      this._frameBuffer.render();

      if (this._settingsService.refreshScreen) {
        this._settingsService.refreshScreen = false;
        this._frameBuffer.resetTextures()
        this._pathTracerUniforms['samples'].value = 0.0
      }
      else if (this._camera.hasChanged || this._refreshScreen || this._pathTracerShader.needsUpdate) {
        this._pathTracerUniforms['samples'].value = 0.0
        this._camera.hasChanged = false
        this._refreshScreen = false
        this._pathTracerShader.needsUpdate = false
        this._settingsService.scaleDown()
      }
      else {
        this._pathTracerUniforms['samples'].value += 1.0
      }
      this._pathTracerUniforms['time'].value += 0.01
    }
  }

  private setupSettingsListeners() {
    this._settingsService.resolutionSub.asObservable().subscribe((resolution: GLM.IArray) => {
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
    this._settingsService.maxIterationsObservable.subscribe(val => {
      this._pathTracerUniforms['u_maxIterations'].value = val
      this._refreshScreen = true
    })
    this._settingsService.materialColorSub.asObservable().subscribe(val => {
      this._pathTracerUniforms['u_materialColor'].value = val
      this._refreshScreen = true
    })
    this._settingsService.materialTypeSub.asObservable().subscribe(val => {
      this._pathTracerUniforms['u_materialType'].value = val
      this._refreshScreen = true
    })
    this._settingsService.shouldRenderSub.asObservable().subscribe(val => this._shouldRender = val)
    this._settingsService.fractalTypeSub.asObservable().subscribe(val => {
      this._pathTracerUniforms['u_fractalType'].value = val
      this._refreshScreen = true
    })
    // this._settingsService.globalLightPowerSub.asObservable().subscribe(val => {
    //   this._pathTracerUniforms['u_globalLightPower'].value = val
    //   this._refreshScreen = true
    // })

    for (let attributeSub of this._settingsService.mengerSponge.attributes) {
      attributeSub.asObservable().subscribe(val => { this._pathTracerUniforms[val.uniformName].value = val.value; this._refreshScreen = true })
    }
  }


  get renderTexture(): WebGLTexture { return this._frameBuffer.texture; }
}
