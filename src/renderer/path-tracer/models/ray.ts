
export default class Ray {
  private _startPosition: GLM.IArray
  private _direction: GLM.IArray

  constructor(startPosition: GLM.IArray, direction: GLM.IArray) {
    this._startPosition = startPosition
    this._direction = direction
  }

  get direction(): GLM.IArray { return this._direction }
  get startPosition(): GLM.IArray { return this._startPosition }
}