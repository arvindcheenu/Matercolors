import { keys, defaultOptions } from './global.constants.js'
import {
  normalizeRGB,
  rgbToHex,
  hexToRgba,
  getContrastText,
  rotateColorBy
} from './color.utils.js'
import { createPallete } from './goldenPalettes.js'
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
    this.palette.primary = this.makePalette('primary')
    this.palette.complementary = this.makePalette('complementary')
    this.palette.analogous = {}
    this.palette.analogous.first = this.makePalette('firstAnalogous')
    this.palette.analogous.second = this.makePalette('secondAnalogous')
    this.palette.triadic = {}
    this.palette.triadic.first = this.makePalette('firstTriadic')
    this.palette.triadic.second = this.makePalette('secondTriadic')
  }

  makePalette (paletteName) {
    const localObject = {}
    let Color
    if (paletteName === 'primary') {
      Color = hexToRgba(this.color)
    } else if (paletteName === 'complementary') {
      Color = hexToRgba(this.complementary())
    } else if (paletteName === 'firstAnalogous') {
      Color = hexToRgba(this.firstAnalogous())
    } else if (paletteName === 'secondAnalogous') {
      Color = hexToRgba(this.secondAnalogous())
    } else if (paletteName === 'analogous') {
      const analogousObject = {}
      analogousObject.first = this.makePalette('firstAnalogous')
      analogousObject.second = this.makePalette('secondAnalogous')
      return analogousObject
    } else if (paletteName === 'firstTriadic') {
      Color = hexToRgba(this.firstTriadic())
    } else if (paletteName === 'secondTriadic') {
      Color = hexToRgba(this.secondTriadic())
    } else if (paletteName === 'triadic') {
      const triadicObject = {}
      triadicObject.first = this.makePalette('firstTriadic')
      triadicObject.second = this.makePalette('secondTriadic')
      return triadicObject
    }
    const newPalette = createPallete(normalizeRGB(Color)).map(u =>
      rgbToHex(
        Math.round(u.red * 255),
        Math.round(u.green * 255),
        Math.round(u.blue * 255)
      )
    )
    const newAccents = createPallete(normalizeRGB(Color), true).map(u =>
      rgbToHex(
        Math.round(u.red * 255),
        Math.round(u.green * 255),
        Math.round(u.blue * 255)
      )
    )
    newPalette.push(...newAccents)
    for (let i = 0; i < keys.length; i += 1) {
      let colorObject = {}
      if (this.options.showContrastText) {
        colorObject.hex = newPalette[i]
        const rgb = hexToRgba(newPalette[i])
        colorObject.contrastText = getContrastText(
          rgb,
          this.options.threshold
        )
      } else {
        colorObject = newPalette[i]
      }
      localObject[keys[i]] = colorObject
    }
    return localObject
  }
}
