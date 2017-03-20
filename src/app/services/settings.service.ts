import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SettingsService {
  private _resolutionObservable: BehaviorSubject<GLM.IArray>
  private _zoomObservable: BehaviorSubject<number>

  // Fractal attributes
  private _powerObservable: BehaviorSubject<number>
  private _detailLevelObservable: BehaviorSubject<number>

  constructor() {
    this._zoomObservable = new BehaviorSubject(1.0)
    this._resolutionObservable = new BehaviorSubject(vec2.fromValues(768, 768))

    this._powerObservable = new BehaviorSubject(10.0)
    this._detailLevelObservable = new BehaviorSubject(1000)
  }

  get resolutionObservable(): Observable<GLM.IArray> { return this._resolutionObservable.asObservable() }
  get zoomObservable(): Observable<number> { return this._zoomObservable.asObservable() }
  get powerObservable(): Observable<number> { return this._powerObservable.asObservable(); }
  get detailLevelObservable(): Observable<number> { return this._detailLevelObservable.asObservable(); }

  set zoom(val: number) { this._zoomObservable.next(val) }
  set resolution(res: number[]) { this._resolutionObservable.next(vec2.fromValues(res[0], res[1])) }
  set power(val: number) { this._powerObservable.next(val) }
  set detailLevel(val: number) { this._detailLevelObservable.next(val) }
}