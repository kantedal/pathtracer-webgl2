import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {MengerSponge} from './fractal-settings/menger-sponge'
import LightSettings from './light-settings'
import Shader from '../utils/shader'
import {RenderEffectsSetting} from "./render-effects-settings";

@Injectable()
export class SettingsService {
  refreshScreen: boolean = false;
  scaledDown: boolean = false;
  scaleDownTimer;

  // Renderer attributes
  shouldRenderSub: BehaviorSubject<boolean> = new BehaviorSubject(false)
  resolutionSub: BehaviorSubject<GLM.IArray>
  zoomSub: BehaviorSubject<number> = new BehaviorSubject(3.0)

  // Lighting attributes
  lightSettings: LightSettings = new LightSettings()
  renderEffectSettings: RenderEffectsSetting = new RenderEffectsSetting()

  // Fractals
  fractalTypeSub: BehaviorSubject<number> = new BehaviorSubject(0)
  mengerSponge = new MengerSponge()

  // Fractal attributes
  private _powerObservable: BehaviorSubject<number>
  private _detailLevelObservable: BehaviorSubject<number>
  private _maxIterationsObservable: BehaviorSubject<number>

  // Material attributes
  materialTypeSub: BehaviorSubject<number> = new BehaviorSubject(5)
  materialColorSub: BehaviorSubject<GLM.IArray> = new BehaviorSubject(vec3.fromValues(1.0, 1.0, 1.0))

  constructor() {
    this.resolutionSub = new BehaviorSubject(vec2.fromValues(256, 256))
    this._powerObservable = new BehaviorSubject(10.0)
    this._detailLevelObservable = new BehaviorSubject(1000)
    this._maxIterationsObservable = new BehaviorSubject(300)
  }

  public connectShader(shader: Shader) {
    this.lightSettings.connectShader(shader)
    this.renderEffectSettings.connectShader(shader)
  }


  public scaleDown() {
    // this.refreshScreen = true
    // this.scaledDown = true
    //
    // clearTimeout(this.scaleDownTimer)
    // this.scaleDownTimer = setTimeout(() => {
    //   this.scaledDown = false
    //   this.refreshScreen = true
    //   this.scaleDownTimer = null
    // }, 500)
  }

  get powerObservable(): Observable<number> { return this._powerObservable.asObservable(); }
  get detailLevelObservable(): Observable<number> { return this._detailLevelObservable.asObservable(); }
  get maxIterationsObservable(): Observable<number> { return this._maxIterationsObservable.asObservable(); }

  set zoom(val: number) { this.zoomSub.next(val) }
  set power(val: number) { this._powerObservable.next(val) }
  set detailLevel(val: number) { this._detailLevelObservable.next(val) }
  set maxIterations(val: number) { this._maxIterationsObservable.next(val) }
  set materialType(val: number) { this.materialTypeSub.next(val) }
  set materialColor(val: GLM.IArray) { this.materialColorSub.next(val) }
  set shouldRender(val: boolean) { this.shouldRenderSub.next(val) }
  //set globalLightPower(val: number) { this.globalLightPowerSub.next(val) }
}
