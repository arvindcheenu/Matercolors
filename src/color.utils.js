export function RGBToHSL(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = (delta === 0) ? 0 : (delta / (1 - Math.abs(2 * l - 1)));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return {
    h, s, l, string: `hsl(${h},${s}%,${l}%)`
  };
}
export function RGBToCYMK(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  let k = Math.min(1 - r, 1 - g, 1 - b);
  const c = parseFloat((((1 - r - k) / (1 - k) || 0) * 100).toFixed(4));
  const m = parseFloat((((1 - g - k) / (1 - k) || 0) * 100).toFixed(4));
  const y = parseFloat((((1 - b - k) / (1 - k) || 0) * 100).toFixed(4));
  k *= 100;
  k = parseFloat(k.toFixed(4));
  return {
    c, y, m, k, string: `cymk(${c}%,${y}%,${m}%,${k}%)`
  };
}
export function hexToRgba(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : {};
}
export function normalizeRGB(rgbObj) {
  return {
    red: rgbObj.r / 255,
    green: rgbObj.g / 255,
    blue: rgbObj.b / 255,
    alpha: 1,
  };
}
export function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
export function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
export function getContrastText({ r, g, b }, threshold) {
  const contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
  return contrast >= threshold ? 'black' : 'white';
}
