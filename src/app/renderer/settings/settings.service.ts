import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {MengerSponge} from "./fractal-settings/menger-sponge";
import Fractal from "./fractal-settings/fractal";
import LightSettings from "./light-settings";

@Injectable()
export class SettingsService {
  // Renderer attributes
  shouldRenderSub: BehaviorSubject<boolean> = new BehaviorSubject(true)
  private _resolutionObservable: BehaviorSubject<GLM.IArray>
  private _zoomObservable: BehaviorSubject<number>

  // Lighting attributes
  lightSettings: LightSettings = new LightSettings()
  globalLightPowerSub: BehaviorSubject<number> = new BehaviorSubject(3.0)

  // Fractals
  mengerSponge = new MengerSponge()

  // Fractal attributes
  private _powerObservable: BehaviorSubject<number>
  private _detailLevelObservable: BehaviorSubject<number>
  private _maxIterationsObservable: BehaviorSubject<number>

  // Material attributes
  materialTypeSub: BehaviorSubject<number> = new BehaviorSubject(5)
  materialColorSub: BehaviorSubject<GLM.IArray> = new BehaviorSubject(vec3.fromValues(1.0, 1.0, 1.0))

  constructor() {
    this._zoomObservable = new BehaviorSubject(1.5)
    this._resolutionObservable = new BehaviorSubject(vec2.fromValues(512, 512))

    this._powerObservable = new BehaviorSubject(10.0)
    this._detailLevelObservable = new BehaviorSubject(1000)
    this._maxIterationsObservable = new BehaviorSubject(300)
  }

  get resolutionObservable(): Observable<GLM.IArray> { return this._resolutionObservable.asObservable() }
  get zoomObservable(): Observable<number> { return this._zoomObservable.asObservable() }
  get powerObservable(): Observable<number> { return this._powerObservable.asObservable(); }
  get detailLevelObservable(): Observable<number> { return this._detailLevelObservable.asObservable(); }
  get maxIterationsObservable(): Observable<number> { return this._maxIterationsObservable.asObservable(); }

  set zoom(val: number) { this._zoomObservable.next(val) }
  set resolution(res: number[]) { this._resolutionObservable.next(vec2.fromValues(res[0], res[1])) }
  set power(val: number) { this._powerObservable.next(val) }
  set detailLevel(val: number) { this._detailLevelObservable.next(val) }
  set maxIterations(val: number) { this._maxIterationsObservable.next(val) }
  set materialType(val: number) { this.materialTypeSub.next(val) }
  set materialColor(val: GLM.IArray) { this.materialColorSub.next(val) }
  set shouldRender(val: boolean) { this.shouldRenderSub.next(val) }
  set globalLightPower(val: number) { this.globalLightPowerSub.next(val) }
}