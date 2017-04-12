import Shader, {IUniform, TEXTURE_TYPE, FLOAT_TYPE, INTEGER_TYPE, VEC2_TYPE, VEC3_TYPE} from "../utils/shader"
import PingPongFBO from "../utils/pingpong-fbo"
import {ISceneTextures} from "./models/scene-builder"
import DataTexture from "../utils/data-texture"
import {SettingsService} from "../settings/settings.service";
import Camera from "./models/camera";
import {CameraNavigator} from "../camera-navigator";
import {gl} from "../utils/render-context";
import {SceneService} from "../scene.service";
import {ISettingAttribute} from "../settings/setting";

/*
 Shader imports
 */
const pathTracerVert = require('raw-loader!glslify!./shaders/path-tracer.vert');
//const pathTracerFrag = require('raw-loader!glslify-loader!./shaders/path-tracer.frag');
const pathTracerFrag = require('raw-loader!./shaders/ray-tracer.glsl');

export default class RayTracer {
  private _navigator: CameraNavigator
  private _pathTracerShader: Shader
  private _frameBuffer: PingPongFBO
  private _pathTracerUniforms: {[name: string]: IUniform}
  private _refreshScreen: boolean
  private _shouldRender = true

  // Data textures
  private _triangleTexture: DataTexture;
  private _lightTexture: DataTexture;
  private _materialTexture: DataTexture;
  private _objectsTexture: DataTexture;
  private _objectsBVHTexture: DataTexture;
  private _triangleIndexTexture: DataTexture;

  constructor(
    private _settingsService: SettingsService,
    private _sceneService: SceneService,
    sceneTextures: ISceneTextures
  ) {
    this._navigator = new CameraNavigator(this._sceneService.camera, _settingsService)

    this._triangleTexture = new DataTexture(2048, 2048, sceneTextures.triangles, "u_triangle_texture")
    this._lightTexture = new DataTexture(128, 128, sceneTextures.light_triangles, "u_light_texture")
    this._materialTexture = new DataTexture(512, 512, sceneTextures.materials, "u_material_texture")
    this._triangleIndexTexture = new DataTexture(1024, 1024, sceneTextures.triangle_indices, "u_triangle_index_texture")
    this._objectsBVHTexture = new DataTexture(2048, 2048, sceneTextures.objects_bvh, "u_objects_bvh_texture")
    this._objectsTexture = new DataTexture(512, 512, sceneTextures.objects, "u_objects_texture")

    this._pathTracerShader = new Shader(pathTracerVert, pathTracerFrag);
    this._pathTracerUniforms = {
      // Data textures
      u_accumulated_texture: { type: TEXTURE_TYPE, value: null },
      u_dome_texture: { type: TEXTURE_TYPE, value: null},
      u_triangle_texture: { type: TEXTURE_TYPE, value: this._triangleTexture.texture },
      u_light_texture: { type: TEXTURE_TYPE, value: this._lightTexture.texture },
      u_material_texture: { type: TEXTURE_TYPE, value: this._materialTexture.texture },
      u_triangle_index_texture: { type: TEXTURE_TYPE, value: this._triangleIndexTexture.texture },
      u_objects_bvh_texture: { type: TEXTURE_TYPE, value: this._objectsBVHTexture.texture },
      u_objects_texture: { type: TEXTURE_TYPE, value: this._objectsTexture.texture },

      // Uniforms
      time: { type: FLOAT_TYPE, value: 1.0 },
      samples: { type: FLOAT_TYPE, value: 0.0 },
      global_lightning_enabled: { type: FLOAT_TYPE, value: 0.0 },
      triangle_count: { type: INTEGER_TYPE, value: sceneTextures.triangle_count },
      object_count: { type: INTEGER_TYPE, value: sceneTextures.object_count },

      // Camera
      u_cameraYaw: { type: FLOAT_TYPE, value: 0.0},
      u_cameraPitch: { type: FLOAT_TYPE, value: 0.0},
      camera_position: { type: VEC3_TYPE, value: this._sceneService.camera.position },
      camera_direction: { type: VEC3_TYPE, value: this._sceneService.camera.direction },
      camera_right: { type: VEC3_TYPE, value: this._sceneService.camera.camera_right },
      camera_up: { type: VEC3_TYPE, value: this._sceneService.camera.camera_up },
    };
    this._pathTracerShader.uniforms = this._pathTracerUniforms
    this._settingsService.connectShader( this._pathTracerShader)

    this._frameBuffer = new PingPongFBO(this._pathTracerShader, 512, 512)

    this.loadDomeTexture("./assets/dome.jpg")

    this.setupSettingsListeners()

    this._refreshScreen = false
  }

  public init() {
    this._navigator = new CameraNavigator(this._sceneService.camera, this._settingsService)
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
    this._settingsService.renderSettings.getAttributeSub('resolution').asObservable().subscribe((attr: ISettingAttribute) => {
      let resolution = attr.value
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

      this._pathTracerUniforms['u_cameraYaw'].value = this._sceneService.camera.yawRotation
      this._pathTracerUniforms['u_cameraPitch'].value = this._sceneService.camera.pitchRotation
      this._pathTracerUniforms['camera_position'].value = this._sceneService.camera.position
      this._pathTracerUniforms['camera_direction'].value = this._sceneService.camera.direction
      this._pathTracerUniforms['camera_right'].value = this._sceneService.camera.camera_right
      this._pathTracerUniforms['camera_up'].value = this._sceneService.camera.camera_up

      this._frameBuffer.render();

      if (this._sceneService.camera.hasChanged || this._refreshScreen || this._pathTracerShader.needsUpdate) {
        this._pathTracerUniforms['samples'].value = 0.0
        this._sceneService.camera.hasChanged = false
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
  get pathTracerUniforms(): {[p: string]: IUniform} { return this._pathTracerUniforms }
  set pathTracerUniforms(value: {[p: string]: IUniform}) { this._pathTracerUniforms = value }
  set refreshScreen(value: boolean) { this._refreshScreen = value; }

  get triangleIndexTexture(): DataTexture { return this._triangleIndexTexture; }
  get objectsBVHTexture(): DataTexture { return this._objectsBVHTexture; }
  get objectsTexture(): DataTexture { return this._objectsTexture; }
  get materialTexture(): DataTexture { return this._materialTexture; }
  get lightTexture(): DataTexture { return this._lightTexture; }
  get triangleTexture(): DataTexture { return this._triangleTexture; }
  get samples(): number { return this._pathTracerUniforms['samples'].value }
}