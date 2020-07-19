import { keys, defaultOptions } from './global.constants.js';
import {
  normalizeRGB, rgbToHex, hexToRgba, RGBToCYMK, RGBToHSL, getContrastText, getComplementary
} from './color.utils.js';
import { createPallete } from './goldenPalettes.js';

export default class Matercolor {
  constructor(color, options) {
    this.color = color;
    const complementary = getComplementary(color);
    this.complementary = () => complementary;
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
    this.palette().secondary = {};
    const primaryPalette = createPallete(
      normalizeRGB(hexToRgba(this.color))
    ).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    const primaryAccents = createPallete(
      normalizeRGB(hexToRgba(this.color)),
      true
    ).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    const secondaryPalette = createPallete(
      normalizeRGB(hexToRgba(this.complementary()))
    ).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    const secondaryAccents = createPallete(
      normalizeRGB(hexToRgba(this.complementary())),
      true
    ).map(u => rgbToHex(
      Math.round(u.red * 255),
      Math.round(u.green * 255),
      Math.round(u.blue * 255)
    ));
    primaryPalette.push(...primaryAccents);
    for (let i = 0; i < keys.length; i += 1) {
      const colorObject = {};
      colorObject.hex = primaryPalette[i];
      colorObject.rgb = hexToRgba(primaryPalette[i]);
      colorObject.rgb.string = `rgb(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b})`;
      colorObject.hsl = RGBToHSL(colorObject.rgb);
      colorObject.cymk = RGBToCYMK(colorObject.rgb);
      colorObject.contrastText = getContrastText(
        colorObject.rgb,
        this.options.threshold
      );
      this.palette().primary[keys[i]] = colorObject;
    }
    secondaryPalette.push(...secondaryAccents);
    for (let i = 0; i < keys.length; i += 1) {
      const colorObject = {};
      colorObject.hex = secondaryPalette[i];
      colorObject.rgb = hexToRgba(secondaryPalette[i]);
      colorObject.rgb.string = `rgb(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b})`;
      colorObject.hsl = RGBToHSL(colorObject.rgb);
      colorObject.cymk = RGBToCYMK(colorObject.rgb);
      colorObject.contrastText = getContrastText(
        colorObject.rgb,
        this.options.threshold
      );
      this.palette().secondary[keys[i]] = colorObject;
    }
  }
}
