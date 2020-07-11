/* eslint-disable no-nested-ternary */
import { keys, defaultOptions } from './global.constants';
import { S, Ed, Y } from './goldenPalettes.utils';
import {
  Kd, KdA, Ld, Md
} from './goldenPalettes';
import {
  rgbToHex,
  normalizeRGB,
  hexToRgba,
  RGBToCYMK,
  RGBToHSL,
  getContrastText
} from './color.utils';

function Jd(A, b) {
  if (Math.abs(A) < 1e-4 && Math.abs(b) < 1e-4) return 0;
  const a = (180 * Math.atan2(A, b)) / Math.PI;
  return a >= 0 ? a : a + 360;
}
function Yd(a, B, accent) {
  const refPalletes = accent ? KdA : Kd;
  const b = B === undefined ? refPalletes : B;
  if (!b.length || !b[0].length) throw Error('Invalid golden palettes');
  let d = b[0]; let e = -1;
  for (let c = Infinity, l = 0; l < b.length; l += 1) {
    for (let h = 0; h < b[l].length && c > 0; h += 1) {
      let g = b[l][h];
      const f = (g.g + a.g) / 2;
      let m = Math.sqrt((g.A ** 2) + (g.B ** 2));
      let n = Math.sqrt((a.A ** 2) + (a.B ** 2));
      let u = (m + n) / 2;
      u = 0.5
        * (1 - Math.sqrt((u ** 7) / ((u ** 7) + (25 ** 7))));
      let q = g.A * (1 + u);
      let p = a.A * (1 + u);
      let r = Math.sqrt((q ** 2) + (g.B ** 2));
      let t = Math.sqrt((p ** 2) + (a.B ** 2));
      u = t - r;
      const v = (r + t) / 2;
      q = Jd(g.B, q);
      p = Jd(a.B, p);
      r = 2
        * Math.sqrt(r * t)
        * Math.sin(
          (((Math.abs(m) < 1e-4 || Math.abs(n) < 1e-4
            ? 0
            : Math.abs(p - q) <= 180
              ? p - q
              : p <= q
                ? p - q + 360
                : p - q - 360)
            / 2)
            * Math.PI)
            / 180
        );
      m = Math.abs(m) < 1e-4 || Math.abs(n) < 1e-4
        ? 0
        : Math.abs(p - q) <= 180
          ? (q + p) / 2
          : q + p < 360
            ? (q + p + 360) / 2
            : (q + p - 360) / 2;
      n = 1 + 0.045 * v;
      t = 1
        + 0.015
          * v
          * (1
            - 0.17 * Math.cos(((m - 30) * Math.PI) / 180)
            + 0.24 * Math.cos((2 * m * Math.PI) / 180)
            + 0.32 * Math.cos(((3 * m + 6) * Math.PI) / 180)
            - 0.2 * Math.cos(((4 * m - 63) * Math.PI) / 180));
      g = Math.sqrt(
        ((a.g - g.g)
            / (1
              + (0.015 * ((f - 50) ** 2))
                / Math.sqrt(20 + ((f - 50) ** 2))))
          ** 2
      )
          + ((u / (1 * n)) ** 2)
          + ((r / (1 * t)) ** 2)
          + (u / (1 * n))
            * Math.sqrt((v ** 7) / ((v ** 7) + (25 ** 7)))
            * Math.sin(
              (60 * Math.exp(-(((m - 275) / 25) ** 2)) * Math.PI) / 180
            )
            * -2
            * (r / (1 * t));
      // eslint-disable-next-line no-unused-expressions
      g < c && ((c = g), (d = b[l]), (e = h));
    }
  }
  return {
    fd: d,
    ed: e
  };
}

class U {
  constructor(a, b, c, d) {
    const D = d === undefined ? 1 : d;
    this.red = a;
    this.green = b;
    this.blue = c;
    this.alpha = D;
    S(a, 1, 'red');
    S(b, 1, 'green');
    S(c, 1, 'blue');
    S(D, 1, 'alpha');
  }
}
class Fd {
  constructor(a, b, c, d) {
    const D = d === undefined ? 1 : d;
    this.g = a;
    this.T = b;
    this.hue = c;
    this.alpha = D;
    S(a, Number.MAX_VALUE, 'lightness');
    S(b, Number.MAX_VALUE, 'chroma');
    S(c, 360, 'hue');
    S(D, 1, 'alpha');
  }
}
function Hd(a) {
  return a <= 0.0031308 ? 12.92 * a : 1.055 * (a, 1 / 2.4) - 0.055;
}
function L(a, b, c) {
  return Math.min(Math.max(a, b), c);
}
function Gd(a) {
  return new Fd(
    a.g,
    Math.sqrt((a.A ** 2) + (a.B ** 2)),
    ((180 * Math.atan2(a.B, a.A)) / Math.PI + 360) % 360,
    a.alpha
  );
}
function Id(a) {
  const b = 6 / 29;
  const c = 3 * (b ** 2);
  return a > b ? (a ** 3) : c * (a - 4 / 29);
}
function createPallete(a, accent) {
  let b;
  const refPalletes = accent ? KdA : Kd;
  const refColor = accent ? 2 : 5;
  b = b === undefined ? refPalletes : b;
  const c = Ed(a);
  let d = Yd(c, b, accent);
  b = d.fd;
  d = d.ed;
  const e = b[d];
  const l = Gd(e);
  const h = Gd(c);
  const g = Gd(b[refColor]).T < 30;
  const f = l.g - h.g;
  const m = l.T - h.T;
  const n = l.hue - h.hue;
  const u = Ld[d];
  const q = Md[d];
  let p = 100;
  return b.map((R, T) => {
    let r = R;
    let t = T;
    if (r === e) {
      p = Math.max(h.g - 1.7, 0);
      // eslint-disable-next-line no-sequences
      return (p), a;
    }
    r = Gd(r);
    let v = r.g - (Ld[t] / u) * f;
    v = Math.min(v, p);
    t = new Fd(
      L(v, 0, 100),
      Math.max(0, g ? r.T - m : r.T - m * Math.min(Md[t] / q, 1.25)),
      (r.hue - n + 360) % 360
    );
    p = Math.max(t.g - 1.7, 0);
    r = (t.hue * Math.PI) / 180;
    t = new Y(t.g, t.T * Math.cos(r), t.T * Math.sin(r), t.alpha);
    let z = (t.g + 16) / 116;
    r = 0.95047 * Id(z + t.A / 500);
    v = 1 * Id(z);
    z = 1.08883 * Id(z - t.B / 200);
    return new U(
      L(Hd(3.2404542 * r + -1.5371385 * v + -0.4985314 * z), 0, 1),
      L(Hd(-0.969266 * r + 1.8760108 * v + 0.041556 * z), 0, 1),
      L(Hd(0.0556434 * r + -0.2040259 * v + 1.0572252 * z), 0, 1),
      t.alpha
    );
  });
}

export default class Matercolor {
  constructor(color, options) {
    this.color = color;
    this.options = options
      ? Object.assign(defaultOptions, options)
      : defaultOptions;
    const paletteObject = {};
    this.palette = () => paletteObject;
    this.getPalette();
  }

  shades(paletteType) {
    return {
      light: this.palette()[paletteType][this.options.light],
      main: this.palette()[paletteType][this.options.main],
      dark: this.palette()[paletteType][this.options.dark]
    };
  }

  accents(paletteType) {
    return {
      A100: this.palette()[paletteType].A100,
      A200: this.palette()[paletteType].A200,
      A400: this.palette()[paletteType].A400,
      A700: this.palette()[paletteType].A700
    };
  }

  getPalette() {
    this.palette().primary = {};
    const palette = createPallete(normalizeRGB(hexToRgba(this.color))).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    const accents = createPallete(normalizeRGB(hexToRgba(this.color)), true).map(
      u => rgbToHex(
        Math.round(u.red * 255),
        Math.round(u.green * 255),
        Math.round(u.blue * 255)
      )
    );
    palette.push(...accents);
    for (let i = 0; i < keys.length; i += 1) {
      const colorObject = {};
      colorObject.hex = palette[i];
      colorObject.rgb = hexToRgba(palette[i]);
      colorObject.rgb.string = `rgb(${colorObject.rgb.r},${
        colorObject.rgb.g
      },${colorObject.rgb.b})`;
      colorObject.hsl = RGBToHSL(colorObject.rgb);
      colorObject.cymk = RGBToCYMK(colorObject.rgb);
      colorObject.contrastText = getContrastText(
        colorObject.rgb,
        this.options.threshold
      );
      this.palette().primary[keys[i]] = colorObject;
    }
  }
}
