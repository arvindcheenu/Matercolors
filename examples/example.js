/* eslint-disable no-console */
import { Matercolor } from "../lib";
const PurplePalette = new Matercolor("#6200EE");
console.log(PurplePalette);
// Matercolor {color: "#6200EE", options: Object, palette: function (), constructor: Object}
console.log(PurplePalette.palette());
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
*/ console.log(
  PurplePalette.shades("primary")
);
// Object {light: Object, main: Object, dark: Object}
console.log(PurplePalette.accents("primary"));
// Object {A100: Object, A200: Object, A400: Object, A700: Object}
