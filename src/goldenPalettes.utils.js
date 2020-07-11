import { T } from './global.constants';

export function S(a, b, c) {
  if (Number.isNaN(a) || a < 0 || a > b) throw new RangeError(`${a} for ${c} is not between 0 and ${b}`);
}
export function W(a) {
  return a <= 0.04045 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4;
}
export function Dd(a) {
  const b = 6 / 29;
  const c = 1 / (3 * (b ** 2));
  return a > (b ** 3) ? (a ** (1 / 3)) : c * a + 4 / 29;
}
export class Y {
  constructor(a, b, c, d) {
    const e = d === undefined ? 1 : d;
    this.g = a;
    this.A = b;
    this.B = c;
    this.alpha = e;
    S(a, Number.MAX_VALUE, 'lightness');
    S(e, 1, 'alpha');
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
