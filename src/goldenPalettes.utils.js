/* eslint-disable no-nested-ternary */
// Local Functions
function isWithinRange (num, max, term) {
  if (Number.isNaN(num) || num < 0 || num > max) throw new RangeError(`${num} for ${term} is not between 0 and ${max}`)
}
function sRGB2linear (a) {
  /* Send this function a decimal sRGB gamma encoded color value *
   * between 0.0 and 1.0, and it returns a linearized value.     */
  return a <= 0.04045 ? a / 12.92 : (((a + 0.055) / 1.055) ** 2.4)
}
function forwardTransformer (a) {
  /* Computes f(t) for Forward Transformation where t is of the form A/normalized_A and the *
   * denominator term correspond to CIEXYZ tristimulus values of the reference white points */
  const b = 6 / 29
  const c = 1 / (3 * (b ** 2))
  return a > (b ** 3) ? (a ** (1 / 3)) : c * a + 4 / 29
}
// Exported Functions
export function minOfMax (a, b, c) {
  return Math.min(Math.max(a, b), c)
}
export function linear2sRGB (a) {
  // Converts linear channels to their sRGB counterparts.
  return a <= 0.0031308 ? 12.92 * a : 1.055 * (a ** (1 / 2.4)) - 0.055
}
export function reverseTransformer (a) {
  // The function for reversing transformation.
  const b = 6 / 29
  const c = 3 * (b ** 2)
  return a > b ? (a ** 3) : c * (a - 4 / 29)
}
export function getHueDegrees (a, b) {
  // This function returns Hue Degrees for given coordinates in LAB Color Space.
  if (Math.abs(a) < 1e-4 && Math.abs(b) < 1e-4) return 0
  const A = 180 * Math.atan2(a, b) / Math.PI
  return A >= 0 ? A : A + 360
}
export class ConstrainRGBA {
  constructor (a, b, c, D) {
    const d = D === undefined ? 1 : D
    this.red = a
    this.green = b
    this.blue = c
    this.alpha = d
    isWithinRange(a, 1, 'red')
    isWithinRange(b, 1, 'green')
    isWithinRange(c, 1, 'blue')
    isWithinRange(d, 1, 'alpha')
  }
}
export class ConstrainHCLA {
  constructor (a, b, c, D) {
    const d = D === undefined ? 1 : D
    this.g = a
    this.T = b
    this.hue = c
    this.alpha = d
    isWithinRange(a, Number.MAX_VALUE, 'lightness')
    isWithinRange(b, Number.MAX_VALUE, 'chroma')
    isWithinRange(c, 360, 'hue')
    isWithinRange(d, 1, 'alpha')
  }
}
export function computeLABterms (a) {
  // Compute the Polar Parameters for Chroma (C*) and Hue (h_ab) in the CIELAB Space
  return new ConstrainHCLA(
    a.g,
    Math.sqrt((a.A ** 2) + (a.B ** 2)), // Chroma
    (180 * Math.atan2(a.B, a.A) / Math.PI + 360) % 360, // Hue
    a.alpha
  )
}
export class ValidateBounds {
  constructor (a, b, c, D) {
    const d = D === undefined ? 1 : D
    this.g = a
    this.A = b
    this.B = c
    this.alpha = d
    isWithinRange(a, Number.MAX_VALUE, 'lightness')
    isWithinRange(d, 1, 'alpha')
  }
}
export function ConvertToLAB (rgb) {
  const red = sRGB2linear(rgb.red)
  const green = sRGB2linear(rgb.green)
  const blue = sRGB2linear(rgb.blue)
  const D65 = 0.2126729 * red + 0.7151522 * green + 0.072175 * blue // Reference
  return new ValidateBounds(
    116 * forwardTransformer(D65) - 16,
    500 *
      (forwardTransformer((0.4124564 * red + 0.3575761 * green + 0.1804375 * blue) / 0.95047) - forwardTransformer(D65)),
    200 *
      (forwardTransformer(D65) - forwardTransformer((0.0193339 * red + 0.119192 * green + 0.9503041 * blue) / 1.08883)),
    rgb.alpha
  )
}
