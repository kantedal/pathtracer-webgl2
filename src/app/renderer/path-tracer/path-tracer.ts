import Shader, {IUniform, TEXTURE_TYPE, FLOAT_TYPE, INTEGER_TYPE, VEC2_TYPE, VEC3_TYPE} from "../utils/shader"
import PingPongFBO from "../utils/pingpong-fbo"
import {ISceneTextures} from "./models/scene-builder"
import DataTexture from "../utils/data-texture"
import {SceneService} from "../scene.service"
import {SettingsService} from "../../services/settings.service";

/*
 Shader imports
 */
const pathTracerVert = require('raw-loader!glslify!./shaders/path-tracer.vert');
//const pathTracerFrag = require('raw-loader!glslify-loader!./shaders/path-tracer.frag');
const pathTracerFrag = require('raw-loader!./shaders/output.glsl');

export default class PathTracer {
  private _frameBuffer: PingPongFBO
  private _pathTracerUniforms: {[name: string]: IUniform}
  private _refreshScreen: boolean;

  constructor(
    private _settingsService: SettingsService,
    private _sceneService: SceneService,
    sceneTextures: ISceneTextures
  ) {
    let triangleTexture = new DataTexture(2048, 2048, sceneTextures.triangles, "u_triangle_texture")
    let lightTexture = new DataTexture(128, 128, sceneTextures.light_triangles, "u_light_texture")
    let materialTexture = new DataTexture(512, 512, sceneTextures.materials, "u_material_texture")
    let triangleIndexTexture = new DataTexture(1024, 1024, sceneTextures.triangle_indices, "u_triangle_index_texture")
    let objectBVHTexture = new DataTexture(2048, 2048, sceneTextures.objects_bvh, "u_objects_bvh_texture")
    let objectsTexture = new DataTexture(512, 512, sceneTextures.objects, "u_objects_texture")

    let pathTracerShader = new Shader(pathTracerVert, pathTracerFrag);
    this._pathTracerUniforms = {
      // Data textures
      u_accumulated_texture: { type: TEXTURE_TYPE, value: null },
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
      camera_position: { type: VEC3_TYPE, value: this._sceneService.camera.position },
      camera_direction: { type: VEC3_TYPE, value: this._sceneService.camera.direction },
      camera_right: { type: VEC3_TYPE, value: this._sceneService.camera.camera_right },
      camera_up: { type: VEC3_TYPE, value: this._sceneService.camera.camera_up },
    };
    pathTracerShader.uniforms = this._pathTracerUniforms

    this._frameBuffer = new PingPongFBO(pathTracerShader, 512, 512)

    this._settingsService.resolutionObservable.subscribe((resolution: GLM.IArray) => {
      this._pathTracerUniforms['resolution'].value = resolution
      this._frameBuffer.setWindowSize(resolution[0], resolution[1])
      this._frameBuffer.resetTextures()
      this._refreshScreen = true
    })

    this._refreshScreen = false
  }

  public render() {
    this._pathTracerUniforms['u_accumulated_texture'].value = this._frameBuffer.texture

    this._pathTracerUniforms['camera_position'].value = this._sceneService.camera.position
    this._pathTracerUniforms['camera_direction'].value = this._sceneService.camera.direction
    this._pathTracerUniforms['camera_right'].value = this._sceneService.camera.camera_right
    this._pathTracerUniforms['camera_up'].value = this._sceneService.camera.camera_up

    this._frameBuffer.render();

    if (this._sceneService.camera.hasChanged || this._refreshScreen) {
      this._pathTracerUniforms['samples'].value = 0.0
      this._sceneService.camera.hasChanged = false
      this._refreshScreen = false
    }
    else {
      this._pathTracerUniforms['samples'].value += 1.0
    }
    this._pathTracerUniforms['time'].value += 0.01
  }

  get renderTexture(): WebGLTexture { return this._frameBuffer.texture; }
}