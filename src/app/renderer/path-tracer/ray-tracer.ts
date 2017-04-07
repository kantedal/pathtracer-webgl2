import Shader, {IUniform, TEXTURE_TYPE, FLOAT_TYPE, INTEGER_TYPE, VEC2_TYPE, VEC3_TYPE} from "../utils/shader"
import PingPongFBO from "../utils/pingpong-fbo"
import {ISceneTextures} from "./models/scene-builder"
import DataTexture from "../utils/data-texture"
import {SettingsService} from "../settings/settings.service";
import Camera from "./models/camera";
import {CameraNavigator} from "../camera-navigator";
import {gl} from "../utils/render-context";

/*
 Shader imports
 */
const pathTracerVert = require('raw-loader!glslify!./shaders/path-tracer.vert');
//const pathTracerFrag = require('raw-loader!glslify-loader!./shaders/path-tracer.frag');
const pathTracerFrag = require('raw-loader!./shaders/ray-tracer.glsl');

export default class RayTracer {
  private _camera: Camera
  private _navigator: CameraNavigator
  private _pathTracerShader: Shader
  private _frameBuffer: PingPongFBO
  private _pathTracerUniforms: {[name: string]: IUniform}
  private _refreshScreen: boolean;
  private _shouldRender = true

  constructor(
    private _settingsService: SettingsService,
    sceneTextures: ISceneTextures
  ) {
    this._camera = new Camera(vec3.fromValues(10.90, 3.51, 4.00), vec3.fromValues(1.59, 3.79, 2.27))
    this._navigator = new CameraNavigator(this._camera, _settingsService)

    let triangleTexture = new DataTexture(2048, 2048, sceneTextures.triangles, "u_triangle_texture")
    let lightTexture = new DataTexture(128, 128, sceneTextures.light_triangles, "u_light_texture")
    let materialTexture = new DataTexture(512, 512, sceneTextures.materials, "u_material_texture")
    let triangleIndexTexture = new DataTexture(1024, 1024, sceneTextures.triangle_indices, "u_triangle_index_texture")
    let objectBVHTexture = new DataTexture(2048, 2048, sceneTextures.objects_bvh, "u_objects_bvh_texture")
    let objectsTexture = new DataTexture(512, 512, sceneTextures.objects, "u_objects_texture")

    this._pathTracerShader = new Shader(pathTracerVert, pathTracerFrag);
    this._pathTracerUniforms = {
      // Data textures
      u_accumulated_texture: { type: TEXTURE_TYPE, value: null },
      u_dome_texture: { type: TEXTURE_TYPE, value: null},
      u_triangle_texture: { type: TEXTURE_TYPE, value: triangleTexture.texture },
      u_light_texture: { type: TEXTURE_TYPE, value: lightTexture.texture },
      u_material_texture: { type: TEXTURE_TYPE, value: materialTexture.texture },
      u_triangle_index_texture: { type: TEXTURE_TYPE, value: triangleIndexTexture.texture },
      u_objects_bvh_texture: { type: TEXTURE_TYPE, value: objectBVHTexture.texture },
      u_objects_texture: { type: TEXTURE_TYPE, value: objectsTexture.texture },

      // Uniforms
      time: { type: FLOAT_TYPE, value: 1.0 },
      samples: { type: FLOAT_TYPE, value: 0.0 },
      trace_depth: { type: INTEGER_TYPE, value: 3 },
      global_lightning_enabled: { type: FLOAT_TYPE, value: 0.0 },
      triangle_count: { type: INTEGER_TYPE, value: sceneTextures.triangle_count },
      object_count: { type: INTEGER_TYPE, value: sceneTextures.object_count },
      resolution: { type: VEC2_TYPE, value: [512, 512] },

      // Camera
      u_cameraYaw: { type: FLOAT_TYPE, value: 0.0},
      u_cameraPitch: { type: FLOAT_TYPE, value: 0.0},
      camera_position: { type: VEC3_TYPE, value: this._camera.position },
      camera_direction: { type: VEC3_TYPE, value: this._camera.direction },
      camera_right: { type: VEC3_TYPE, value: this._camera.camera_right },
      camera_up: { type: VEC3_TYPE, value: this._camera.camera_up },
    };
    this._pathTracerShader.uniforms = this._pathTracerUniforms
    this._settingsService.connectShader( this._pathTracerShader)

    this._frameBuffer = new PingPongFBO(this._pathTracerShader, 512, 512)

    this.loadDomeTexture("./assets/sky-3.jpg")

    this.setupSettingsListeners()

    this._refreshScreen = false
  }

  public loadDomeTexture(url: any) {
    //console.log(image)w
    let lightSphereTexture = gl.createTexture();
    let lightSphereLocation = gl.getUniformLocation(this._frameBuffer._program, "u_dome_texture");

    let lightSphereImage = new Image();
    lightSphereImage.onload = () => {
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
    }
    lightSphereImage.src = url

    this._pathTracerUniforms['u_dome_texture'].value = lightSphereTexture
  }

  private setupSettingsListeners() {
    this._settingsService.resolutionSub.asObservable().subscribe((resolution: GLM.IArray) => {
      this._pathTracerUniforms['resolution'].value = resolution
      this._frameBuffer.setWindowSize(resolution[0], resolution[1])
      this._frameBuffer.resetTextures()
      this._refreshScreen = true
    })
    this._settingsService.maxIterationsObservable.subscribe(val => {
      this._pathTracerUniforms['u_maxIterations'].value = val
      this._refreshScreen = true
    })
    this._settingsService.shouldRenderSub.asObservable().subscribe(val => this._shouldRender = val)
  }

  public render() {
    if (this._shouldRender) {
      this._pathTracerUniforms['u_accumulated_texture'].value = this._frameBuffer.texture

      this._pathTracerUniforms['u_cameraYaw'].value = this._camera.yawRotation
      this._pathTracerUniforms['u_cameraPitch'].value = this._camera.pitchRotation
      this._pathTracerUniforms['camera_position'].value = this._camera.position
      this._pathTracerUniforms['camera_direction'].value = this._camera.direction
      this._pathTracerUniforms['camera_right'].value = this._camera.camera_right
      this._pathTracerUniforms['camera_up'].value = this._camera.camera_up

      this._frameBuffer.render();

      if (this._camera.hasChanged || this._refreshScreen || this._pathTracerShader.needsUpdate) {
        this._pathTracerUniforms['samples'].value = 0.0
        this._camera.hasChanged = false
        this._pathTracerShader.needsUpdate = false
        this._refreshScreen = false
      }
      else {
        this._pathTracerUniforms['samples'].value += 1.0
      }
      this._pathTracerUniforms['time'].value += 0.01
    }
  }

  get renderTexture(): WebGLTexture { return this._frameBuffer.texture; }
}