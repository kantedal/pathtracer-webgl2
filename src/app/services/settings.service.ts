import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SettingsService {
  private _resolutionObservable: BehaviorSubject<GLM.IArray>
  private _zoomObservable: BehaviorSubject<number>

  constructor() {
    this._zoomObservable = new BehaviorSubject(1.0)
    this._resolutionObservable = new BehaviorSubject(vec2.fromValues(1000, 700))
  }

  get resolutionObservable(): Observable<GLM.IArray> { return this._resolutionObservable.asObservable() }
  get zoomObservable(): Observable<number> { return this._zoomObservable.asObservable() }

  set zoom(val: number) { this._zoomObservable.next(val) }
  set resolution(res: number[]) { this._resolutionObservable.next(vec2.fromValues(res[0], res[1])) }
}