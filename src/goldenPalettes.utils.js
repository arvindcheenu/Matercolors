import { T } from "./global.constants";
export function S(a, b, c) {
  if (isNaN(a) || 0 > a || a > b)
    throw new RangeError(a + " for " + c + " is not between 0 and " + b);
}

export function Ed(a) {
  var b = W(a.red),
    c = W(a.green),
    d = W(a.blue),
    e = 0.2126729 * b + 0.7151522 * c + 0.072175 * d;
  return new Y(
    116 * Dd(e) - 16,
    500 *
      (Dd((0.4124564 * b + 0.3575761 * c + 0.1804375 * d) / 0.95047) - Dd(e)),
    200 *
      (Dd(e) - Dd((0.0193339 * b + 0.119192 * c + 0.9503041 * d) / 1.08883)),
    a.alpha
  );
}
export function W(a) {
  return 0.04045 >= a ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
}
export function Dd(a) {
  var b = 6 / 29,
    c = 1 / (3 * Math.pow(b, 2));
  return a > Math.pow(b, 3) ? Math.pow(a, 1 / 3) : c * a + 4 / 29;
}
export class Y {
  constructor(a, b, c, d) {
    d = void 0 === d ? 1 : d;
    this.g = a;
    this.A = b;
    this.B = c;
    this.alpha = d;
    S(a, Number.MAX_VALUE, "lightness");
    S(d, 1, "alpha");
  }
  La(a) {
    return (
      1e-4 > Math.abs(this.g - a.g) &&
      1e-4 > Math.abs(this.A - a.A) &&
      1e-4 > Math.abs(this.B - a.B) &&
      Math.abs(this.alpha - a.alpha) < T
    );
  }
}
