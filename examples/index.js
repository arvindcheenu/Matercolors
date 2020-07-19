import Matercolor from '../src/index.js';

const PurplePalette = new Matercolor ('#6200EE');
console.log ('\n\nPALETTE CLASS\n\n');
console.log (JSON.stringify (PurplePalette, null, 2));
// Matercolor {color: "#6200EE", options: Object, palette: function (), constructor: Object}
console.log ('\n\nPALETTE OBJECT\n\n');
console.log (JSON.stringify (PurplePalette.palette (), null, 2));
/**
 * Object {primary: Object}
    primary: Object
      50: Object
      100: Object
      200: Object
      300: Object
      400: Object
      500: Object
      600: Object
      700: Object
      800: Object
      900: Object
      A100: Object
      A200: Object
      A400: Object
      A700: Object
    secondary : Object 
      50: Object
      100: Object
      200: Object
      300: Object
      400: Object
      500: Object
      600: Object
      700: Object
      800: Object
      900: Object
      A100: Object
      A200: Object
      A400: Object
      A700: Object
*/

console.log ('\n\nPRIMARY PALETTE SHADES\n\n');
console.log (JSON.stringify (PurplePalette.shades ('primary'), null, 2));
// Object {light: Object, main: Object, dark: Object}
console.log ('\n\nPRIMARY PALETTE ACCENTS\n\n');
console.log (JSON.stringify (PurplePalette.accents ('primary'), null, 2));
// Object {A100: Object, A200: Object, A400: Object, A700: Object}

console.log ('\n\nSECONDARY PALETTE SHADES\n\n');
console.log (JSON.stringify (PurplePalette.shades ('secondary'), null, 2));
// Object {light: Object, main: Object, dark: Object}
console.log ('\n\nSECONDARY PALETTE ACCENTS\n\n');
console.log (JSON.stringify (PurplePalette.accents ('secondary'), null, 2));
// Object {A100: Object, A200: Object, A400: Object, A700: Object}
