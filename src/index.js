import { keys, defaultOptions } from './global.constants.js';
import {
  normalizeRGB, rgbToHex, hexToRgba, RGBToCYMK, RGBToHSL, getContrastText
} from './color.utils.js';
import { createPallete } from './goldenPalettes.js';

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
      dark: this.palette()[paletteType][this.options.dark],
    };
  }

  accents(paletteType) {
    return {
      A100: this.palette()[paletteType].A100,
      A200: this.palette()[paletteType].A200,
      A400: this.palette()[paletteType].A400,
      A700: this.palette()[paletteType].A700,
    };
  }

  getPalette() {
    this.palette().primary = {};
    const palette = createPallete(
      normalizeRGB(hexToRgba(this.color))
    ).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    const accents = createPallete(
      normalizeRGB(hexToRgba(this.color)),
      true
    ).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    palette.push(...accents);
    for (let i = 0; i < keys.length; i += 1) {
      const colorObject = {};
      colorObject.hex = palette[i];
      colorObject.rgb = hexToRgba(palette[i]);
      colorObject.rgb.string = `rgb(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b})`;
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
