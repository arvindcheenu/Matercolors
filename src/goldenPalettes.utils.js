/* eslint-disable no-nested-ternary */
import { T } from './global.constants.js';
// Local Functions
function S(a, b, c) {
  if (Number.isNaN(a) || a < 0 || a > b) throw new RangeError(`${a} for ${c} is not between 0 and ${b}`);
}
function W(a) {
  return a <= 0.04045 ? a / 12.92 : (((a + 0.055) / 1.055) ** 2.4);
}
function Dd(a) {
  const b = 6 / 29; const
    c = 1 / (3 * (b ** 2));
  return a > (b ** 3) ? (a ** (1 / 3)) : c * a + 4 / 29;
}
// Exported Functions
export function L(a, b, c) {
  return Math.min(Math.max(a, b), c);
}
export function Hd(a) {
  return a <= 0.0031308 ? 12.92 * a : 1.055 * (a ** (1 / 2.4)) - 0.055;
}
export function Id(a) {
  const b = 6 / 29; const
    c = 3 * (b ** 2);
  return a > b ? (a ** 3) : c * (a - 4 / 29);
}
export function Jd(a, b) {
  if (Math.abs(a) < 1e-4 && Math.abs(b) < 1e-4) return 0;
  const A = 180 * Math.atan2(a, b) / Math.PI;
  return A >= 0 ? A : A + 360;
}
export class U {
  constructor(a, b, c, D) {
    const d = D === undefined ? 1 : D;
    this.red = a;
    this.green = b;
    this.blue = c;
    this.alpha = d;
    S(a, 1, 'red');
    S(b, 1, 'green');
    S(c, 1, 'blue');
    S(d, 1, 'alpha');
  }
}
export class Fd {
  constructor(a, b, c, D) {
    const d = D === undefined ? 1 : D;
    this.g = a;
    this.T = b;
    this.hue = c;
    this.alpha = d;
    S(a, Number.MAX_VALUE, 'lightness');
    S(b, Number.MAX_VALUE, 'chroma');
    S(c, 360, 'hue');
    S(d, 1, 'alpha');
  }
}
export function Gd(a) {
  return new Fd(
    a.g,
    Math.sqrt((a.A ** 2) + (a.B ** 2)),
    (180 * Math.atan2(a.B, a.A) / Math.PI + 360) % 360,
    a.alpha
  );
}
export class Y {
  constructor(a, b, c, D) {
    const d = D === undefined ? 1 : D;
    this.g = a;
    this.A = b;
    this.B = c;
    this.alpha = d;
    S(a, Number.MAX_VALUE, 'lightness');
    S(d, 1, 'alpha');
  }

  La(a) {
    return (
      Math.abs(this.g - a.g) < 1e-4
      && Math.abs(this.A - a.A) < 1e-4
      && Math.abs(this.B - a.B) < 1e-4
      && Math.abs(this.alpha - a.alpha) < T
    );
  }
}
export function Ed(a) {
  const b = W(a.red);
  const c = W(a.green);
  const d = W(a.blue);
  const e = 0.2126729 * b + 0.7151522 * c + 0.072175 * d;
  return new Y(
    116 * Dd(e) - 16,
    500
      * (Dd((0.4124564 * b + 0.3575761 * c + 0.1804375 * d) / 0.95047) - Dd(e)),
    200
      * (Dd(e) - Dd((0.0193339 * b + 0.119192 * c + 0.9503041 * d) / 1.08883)),
    a.alpha
  );
}
