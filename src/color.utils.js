/* eslint-disable no-bitwise */
export function hexToRgba (hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : {}
}
export function normalizeRGB (rgbObj) {
  return {
    red: rgbObj.r / 255,
    green: rgbObj.g / 255,
    blue: rgbObj.b / 255,
    alpha: 1
  }
}
export function componentToHex (c) {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}
export function rgbToHex (r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}
export function getContrastText ({ r, g, b }, threshold) {
  const contrast =
    (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000
  return contrast >= threshold ? 'black' : 'white'
}

export function rotateColorBy (hex, rotationAmount) {
  const rgb = hexToRgba(hex)
  let r = rgb.r / 255.0
  let g = rgb.g / 255.0
  let b = rgb.b / 255.0
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const l = (max + min) / 2.0
  if (max === min) {
    h = 0
    s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min)
    if (max === r && g >= b) {
      h = 1.0472 * (g - b) / d
    } else if (max === r && g < b) {
      h = 1.0472 * (g - b) / d + 6.2832
    } else if (max === g) {
      h = 1.0472 * (b - r) / d + 2.0944
    } else if (max === b) {
      h = 1.0472 * (r - g) / d + 4.1888
    }
  }
  h = h / 6.2832 * 360.0 + 0
  // Shift hue to opposite side of wheel and convert to [0-1] value
  h += rotationAmount
  if (h > 360) {
    h -= 360
  }
  h /= 360
  if (s === 0) {
    r = l
    g = l
    b = l // achromatic
  } else {
    const hue2rgb = function hue2rgb (p, q, T) {
      let t = T
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  // Convert r b and g values to hex
  const final = b | (g << 8) | (r << 16)
  return `#${(0x1000000 | final).toString(16).substring(1)}`
}
