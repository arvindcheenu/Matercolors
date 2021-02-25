import {keys} from './global.constants.js';
import {
  normalizeRGB,
  rgbToHex,
  hexToRgb,
  rotateColorBy,
  mostReadable,
} from './color.utils.js';
import {createPallete} from './goldenPalettes.js';
export default class Matercolor {
  constructor (color) {
    this._init = color;
    this._color = color;
    this._level = 'AA';
    this._size = 'small';
    this._greedy = false;
    this.is = () => {
      return this._color;
    };
    this.palette = paletteName => {
      return this._scheme (paletteName);
    };
    this.greedy = () => {
      this._greedy = true;
      return this;
    };
    this.AAA = () => {
      this._level = 'AAA';
      return this;
    };
    this.AA = () => {
      this._level = 'AA';
      return this;
    };
    this.small = () => {
      this._size = 'small';
      return this;
    };
    this.large = () => {
      this._size = 'large';
      return this;
    };
    this.contrastColor = (color = null) => {
      let baseColor = this._color;
      let colorList;
      if (color === null) {
        colorList = [];
      } else if (color.includes ('self')) {
        colorList = Object.values (this.palette ('p'));
      } else if (/^#([A-Fa-f0-9]{6})$/gim.test (color)) {
        colorList = Object.values (new Matercolor (color).palette ('p'));
      }
      let args = {level: this._level, size: this._size};
      return mostReadable (baseColor, colorList, this._greedy, args);
    };
    this.root = () => {
      this._init = this._color;
      this._scheme ('primary', true);
      this._scheme ('complementary', true);
      this._scheme ('analogous', true);
      this._scheme ('triadic', true);
      return this;
    };
    this._scheme ('primary', true);
    this._scheme ('complementary', true);
    this._scheme ('analogous', true);
    this._scheme ('triadic', true);
  }
  _scheme (paletteName, regenerate = false) {
    const localObject = {};
    let Color;
    let Prefix = paletteName[0].toUpperCase ();
    if (Prefix === 'P') {
      Color = hexToRgb (this._init);
    } else if (Prefix === 'C') {
      Color = hexToRgb (rotateColorBy (this._init, 180));
    } else if (paletteName === 'firstAnalogous') {
      Prefix = 'A';
      Color = hexToRgb (rotateColorBy (this._init, -30));
    } else if (paletteName === 'secondAnalogous') {
      Prefix = 'A1';
      Color = hexToRgb (rotateColorBy (this._init, 30));
    } else if (Prefix === 'A') {
      const analogousObject = {};
      analogousObject.primary = this._scheme ('firstAnalogous', regenerate);
      analogousObject.secondary = this._scheme ('secondAnalogous', regenerate);
      return analogousObject;
    } else if (paletteName === 'firstTriadic') {
      Prefix = 'T';
      Color = hexToRgb (rotateColorBy (this._init, 60));
    } else if (paletteName === 'secondTriadic') {
      Prefix = 'T1';
      Color = hexToRgb (rotateColorBy (this._init, 120));
    } else if (Prefix === 'T') {
      const triadicObject = {};
      triadicObject.primary = this._scheme ('firstTriadic', regenerate);
      triadicObject.secondary = this._scheme ('secondTriadic', regenerate);
      return triadicObject;
    }
    const newPalette = createPallete (normalizeRGB (Color)).map (u =>
      rgbToHex (
        Math.round (u.red * 255),
        Math.round (u.green * 255),
        Math.round (u.blue * 255)
      )
    );
    for (let i = 0; i < keys.length; i += 1) {
      let colorObject = {};
      if (regenerate === true) {
        const ckey = Prefix + keys[i];
        if (Prefix === 'P') {
          this[keys[i]] = newPalette[i];
        }
        Object.defineProperty (this, ckey.toString (), {
          value: newPalette[i],
          configurable: true,
          writable: true,
        });
        this[ckey.toString ().toLowerCase ()] = function () {
          this._color = newPalette[i];
          return this;
        };
      } else {
        colorObject = newPalette[i];
        localObject[keys[i]] = colorObject;
      }
    }
    return localObject;
  }
}
