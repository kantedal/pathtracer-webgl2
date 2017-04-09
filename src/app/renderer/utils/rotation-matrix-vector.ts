export const rotationMatrixVector = (v: GLM.IArray, angle: number) => {
  let c = Math.cos(angle)
  let s = Math.sin(angle)

  return mat3.fromValues(
    c + (1.0 - c) * v[0] * v[0], (1.0 - c) * v[0] * v[1] - s * v[2], (1.0 - c) * v[0] * v[2] + s * v[1],
    (1.0 - c) * v[0] * v[1] + s * v[2], c + (1.0 - c) * v[1] * v[1], (1.0 - c) * v[1] * v[2] - s * v[0],
    (1.0 - c) * v[0] * v[2] - s * v[1], (1.0 - c) * v[1] * v[2] + s * v[0], c + (1.0 - c) * v[2] * v[2]
  )
}