/* eslint-disable no-bitwise */
import {EPS, MAX_ITER, type} from './global.constants';
export function hexToRgb (hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec (hex);
  return result
    ? {
        r: parseInt (result[1], 16),
        g: parseInt (result[2], 16),
        b: parseInt (result[3], 16),
      }
    : {};
}
export function normalizeRGB (rgbObj) {
  return {
    red: rgbObj.r / 255,
    green: rgbObj.g / 255,
    blue: rgbObj.b / 255,
    alpha: 1,
  };
}
export function componentToHex (c) {
  const hex = c.toString (16);
  return hex.length === 1 ? `0${hex}` : hex;
}
export function rgbToHex (r, g, b) {
  return `#${componentToHex (r)}${componentToHex (g)}${componentToHex (b)}`;
}
export function rotateColorBy (hex, rotationAmount) {
  const rgb = hexToRgb (hex);
  let r = rgb.r / 255.0;
  let g = rgb.g / 255.0;
  let b = rgb.b / 255.0;
  const max = Math.max (r, g, b);
  const min = Math.min (r, g, b);
  let h;
  let s;
  const l = (max + min) / 2.0;
  if (max === min) {
    h = 0;
    s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min);
    if (max === r && g >= b) {
      h = 1.0472 * (g - b) / d;
    } else if (max === r && g < b) {
      h = 1.0472 * (g - b) / d + 6.2832;
    } else if (max === g) {
      h = 1.0472 * (b - r) / d + 2.0944;
    } else if (max === b) {
      h = 1.0472 * (r - g) / d + 4.1888;
    }
  }
  h = h / 6.2832 * 360.0 + 0;
  // Shift hue to opposite side of wheel and convert to [0-1] value
  h += rotationAmount;
  if (h > 360) {
    h -= 360;
  }
  h /= 360;
  if (s === 0) {
    r = l;
    g = l;
    b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb (p, q, T) {
      let t = T;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb (p, q, h + 1 / 3);
    g = hue2rgb (p, q, h);
    b = hue2rgb (p, q, h - 1 / 3);
  }
  r = Math.round (r * 255);
  g = Math.round (g * 255);
  b = Math.round (b * 255);
  // Convert r b and g values to hex
  const final = b | (g << 8) | (r << 16);
  return `#${(0x1000000 | final).toString (16).substring (1)}`;
}

function validateWCAG2Parms (parms) {
  // return valid WCAG2 parms for isReadable.
  // If input parms are invalid, return {"level":"AA", "size":"small"}
  var level, size;
  parms = parms || {level: 'AA', size: 'small'};
  level = (parms.level || 'AA').toUpperCase ();
  size = (parms.size || 'small').toLowerCase ();
  if (level !== 'AA' && level !== 'AAA') {
    level = 'AA';
  }
  if (size !== 'small' && size !== 'large') {
    size = 'small';
  }
  return {level: level, size: size};
}
const luminance = color => {
  //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  var rgb = hexToRgb (color);
  var RsRGB, GsRGB, BsRGB, R, G, B;
  RsRGB = rgb.r / 255;
  GsRGB = rgb.g / 255;
  BsRGB = rgb.b / 255;
  if (RsRGB <= 0.03928) {
    R = RsRGB / 12.92;
  } else {
    R = Math.pow ((RsRGB + 0.055) / 1.055, 2.4);
  }
  if (GsRGB <= 0.03928) {
    G = GsRGB / 12.92;
  } else {
    G = Math.pow ((GsRGB + 0.055) / 1.055, 2.4);
  }
  if (BsRGB <= 0.03928) {
    B = BsRGB / 12.92;
  } else {
    B = Math.pow ((BsRGB + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
const readability = (color1, color2) => {
  return (
    (Math.max (luminance (color1), luminance (color2)) + 0.05) /
    (Math.min (luminance (color1), luminance (color2)) + 0.05)
  );
};
const isReadable = (color1, color2, wcag2) => {
  let score = readability (color1, color2);
  let wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms (wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case 'AAsmall':
    case 'AAAlarge':
      out = score >= 4.5;
      break;
    case 'AAlarge':
      out = score >= 3;
      break;
    case 'AAAsmall':
      out = score >= 7;
      break;
  }
  return out;
};
export const mostReadable = (baseColor, colorList, greedy, args) => {
  var bestColor = null;
  var bestScore = 0;
  var readScore;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = colorList.length === 0 ? true : false;
  level = args.level;
  size = args.size;

  for (var i = 0; i < colorList.length; i++) {
    readScore = readability (baseColor, colorList[i]);
    if (readScore > bestScore) {
      bestScore = readScore;
      bestColor = colorList[i];
      if (
        !greedy &&
        isReadable (baseColor, bestColor, {level: level, size: size})
      ) {
        break;
      }
    }
  }
  if (
    isReadable (baseColor, bestColor, {level: level, size: size}) ||
    !includeFallbackColors
  ) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return mostReadable (baseColor, ['#ffffff', '#000000'], args);
  }
};
