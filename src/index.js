import { keys, defaultOptions } from './global.constants.js'
import {
  normalizeRGB,
  rgbToHex,
  hexToRgba,
  getContrastText,
  rotateColorBy
} from './color.utils.js'
import { buildPalette, buildAccent } from './goldenPalettes.js'
export default class Matercolor {
  constructor (color, options) {
    this.palette = {}
    this.color = color
    this.options = options
      ? Object.assign(defaultOptions, options)
      : defaultOptions
    this.complementary = () => rotateColorBy(this.color, 180)
    this.firstAnalogous = () => rotateColorBy(this.color, -30)
    this.secondAnalogous = () => rotateColorBy(this.color, 30)
    this.firstTriadic = () => rotateColorBy(this.color, 60)
    this.secondTriadic = () => rotateColorBy(this.color, 120)
    this.palette.primary = this.makePalette('primary', true)
    this.palette.complementary = this.makePalette('complementary', true)
    this.palette.analogous = {}
    this.palette.analogous.primary = this.makePalette('firstAnalogous', true)
    this.palette.analogous.secondary = this.makePalette(
      'secondAnalogous',
      true
    )
    this.palette.triadic = {}
    this.palette.triadic.primary = this.makePalette('firstTriadic', true)
    this.palette.triadic.secondary = this.makePalette('secondTriadic', true)
  }

  makePalette (paletteName, updateRoot = false) {
    const localObject = {}
    let Color
    let Prefix
    if (paletteName === 'primary') {
      Prefix = ''
      Color = hexToRgba(this.color)
    } else if (paletteName === 'complementary') {
      Prefix = 'C'
      Color = hexToRgba(this.complementary())
    } else if (paletteName === 'firstAnalogous') {
      Prefix = 'A1'
      Color = hexToRgba(this.firstAnalogous())
    } else if (paletteName === 'secondAnalogous') {
      Prefix = 'A2'
      Color = hexToRgba(this.secondAnalogous())
    } else if (paletteName === 'analogous') {
      const analogousObject = {}
      analogousObject.primary = this.makePalette('firstAnalogous', true)
      analogousObject.secondary = this.makePalette('secondAnalogous', true)
      return analogousObject
    } else if (paletteName === 'firstTriadic') {
      Prefix = 'T1'
      Color = hexToRgba(this.firstTriadic())
    } else if (paletteName === 'secondTriadic') {
      Prefix = 'T2'
      Color = hexToRgba(this.secondTriadic())
    } else if (paletteName === 'triadic') {
      const triadicObject = {}
      triadicObject.primary = this.makePalette('firstTriadic', true)
      triadicObject.secondary = this.makePalette('secondTriadic', true)
      return triadicObject
    }
    const newPalette = buildPalette(normalizeRGB(Color)).map(u =>
      rgbToHex(
        Math.round(u.red * 255),
        Math.round(u.green * 255),
        Math.round(u.blue * 255)
      )
    )
    const newAccent = buildAccent(normalizeRGB(Color)).map(u =>
      rgbToHex(
        Math.round(u.red * 255),
        Math.round(u.green * 255),
        Math.round(u.blue * 255)
      )
    )
    newPalette.push(...newAccent)
    for (let i = 0; i < keys.length; i += 1) {
      const ckey = Prefix + keys[i]
      let colorObject = {}
      if (this.options.showContrastText) {
        const rgb = hexToRgba(newPalette[i])
        const contrastText = getContrastText(rgb, this.options.threshold)
        if (updateRoot === true) {
          this[ckey] = {}
          this[ckey].hex = newPalette[i]
          this[ckey].contrastText = contrastText
        }
        colorObject.hex = newPalette[i]
        colorObject.contrastText = contrastText
      } else {
        if (updateRoot === true) this[ckey] = newPalette[i]
        colorObject = newPalette[i]
      }
      localObject[keys[i]] = colorObject
    }
    return localObject
  }
}
