<p align="center">
   <a href="https://www.npmjs.com/package/@arvindcheenu/matercolor">
     <img width="100" src="https://i.ibb.co/3FYNrs3/logo.png" alt="Matercolors">
   </a>
   <h1 align="center">Matercolors</h1>
</p>
<p align="center">
   <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/arvindcheenu/matercolor?style=flat-square">
   <img alt="npm" src="https://img.shields.io/npm/v/matercolors?color=cc3534&style=flat-square">
   <img alt="npm" src="https://img.shields.io/npm/dt/matercolors?label=overall%20downloads&style=flat-square">
   <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/matercolors?label=npm%20bundle%20size&style=flat-square">
   <img alt="npm dependencies" src="https://img.shields.io/static/v1?label=dependencies&message=0&color=brightgreen&style=flat-square">
   <img alt="NPM" src="https://img.shields.io/npm/l/matercolors?style=flat-square">
  <br/> <br/>
  A tiny, <b>zero-dependency</b> libary for building harmonious material palettes for <b>any color</b>.
</p>
<p align="center">
<a href="https://github.com/arvindcheenu">Created with ❤️ by <b>Arvind Srinivasan.</b></a>
 <br><br>
</p>
<br>

> **✨ New in v.2.2.10 : Skyrocketing Productivity!** 
> 
> Updated version to match Semantic Versioning Standards.
> 
> Removed the residual options that were missed in the latest major version.
>
> Most importantly,direct dot access functionality has been added to the constructor so that one can **quickly access the colors they need across palettes**.

> **✨ New in v.2.0 : Lose some features, Gain even more!** 
>
> `shades` and `accents` are completely removed as they were redundant. They are replaced by a `makePalette` helper function. This freed up some space for new palette generators for building `analogous` and `triadic` palettes. 
>
> As color conversions can be done by other libraries, these helpers were removed to make API more expressive.
>
> **While the package size reduced by 5%, productivity increased by 50%**.  
> 

## 🎉 Installation

Use the package manager [npm](https://www.npmjs.com/) to install `matercolors` from commandline.

```bash
npm i matercolors
```
Alternatively, you can update your `package.json` as:
```bash
"matercolors": "latest"
```

> **✨ New in v.1.2 : Matercolor now works in the browser!** 
>
> If you want to use it as a CDN instead, you can access it through `unpkg`!
> 
<br>

## 🚸 Usage
### 🎨 Palette Constructor

After installing, import and use the library like any ES6 default imports. For example like this:

```js
import Matercolor from 'matercolors'
let Purple = new Matercolor('#6200EE')
```
Logging `Purple` gives the output of the constructor with the following organisation.
```js
Matercolor {
  // color keys in constructor for direct dot access 
  this[ckey] = [String]
  // ...where ckey is given by concatenating root keys with palette prefix.
  color: '#6200EE',
  options: { threshold: 128, showContrastText: false },
  palette: [Function] }
```

As you can see here, ckey is given by concatenating root keys (`100` to `900`) with palette prefix. The palette name and the corresponding prefix is given in the following table:

| Palette Name | Prefix |
|-|-|
| primary | `` |
| complementary | `C` |
| analogous primary | `A` |
| analogous secondary | `A1` |
| triadic primary | `T` |
| triadic secondary | `T1` |

### 🔧 Options and Methods
As you can see from the constructor, currently **Matercolor** offers **2** options for configuration.

| Options | Type | Default | What it does |
|-|-|-|-|
| `threshold` |`Number`| `128` | Sets the **Contrast threshold** for the foreground text |
| `showContrastText` |`Boolean`| `false` | Shows contrast text colour for each color in the palette |

Apart from these options, the new Matercolor exposes a single function to generate specific palettes.

#### makePalette(paletteName : `String`, updateRoot: `Boolean`) returns `Object`
where `paletteName` can be any one of the following case-sensitive strings: **`primary`**, **`complementary`**, **`analogous`**, **`firstAnalogous`**, **`secondAnalogous`**, **`triadic`**, **`firstTriadic`**, **`secondTriadic`**.

#### 🏗️ Palette Object Structure
We can the palette output for the `Purple` color by
```
Purple.palette
```
we get an output that follows the following structure.

```js
{
  primary : { // type of palette
    // varies depending on whether 
    50 : [String|{hex : String, contrastText: 'white'|'black'}],
    100 : [String|Object],
    200 : [String|Object],
    ...
    900 : [String|Object], // darkest color in palette
  },
  // similarly we have for other derived palettes
  complementary : { ... },
  analogous : {
    primary: { ... },
    secondary: { ... },
  },
  triadic : {
    primary: { ... },
    secondary: { ... },
  }
}
```

These outputs can also be used in conjunction with [Material UI's](https://material-ui.com/) 
[**createMuiTheme**](https://material-ui.com/customization/theming/#createmuitheme-options-args-theme) to configure custom palettes.

### Usage with `createMuiTheme` 

The following snippet shows an example usage with `createMuiTheme()` using the `shades()` function:
```js
import Matercolor from 'matercolors';
import { createMuiTheme } from '@material-ui/core/styles';

let purple = new Matercolor('#6200EE');
/*
You can still use this though you may not need to now:
let primary = purple.palette.primary;
let secondary = purple.palette.complementary; // complementary palette generated for you!
// similarly use any derived palettes
let analogous = purple.palette.analogous.primary; // choose any of the two color schemes
let triadic = purple.palette.triadic.secondary;    // choose any of the two color schemes
*/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple.500,
      light: purple.200,
      dark: purple.700,
    },
    secondary: {
      main: purple.C500,
      light: purple.C200,
      dark: purple.C700,
    },
  },
});
```

### Usage with `colorthief`

**Want you could create a full-fledged theme that matches your logo?**

After installing colorthief (`npm i colorthief`) you can use the following code snippet as reference.

```js
const Matercolor = require('matercolors');
const ColorThief = require('colorthief');
const imageName = 'my-awesome-logo.png'; // path to your image file
const numberOfColors = 5; // change the number to as many colors as you want
let brandPalette = [];
const rgbToHex = (rgb) => '#' + rgb.map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')
const img = resolve(process.cwd(), imageName);
ColorThief.getPalette(img, numberOfColors)
    .then(palette => { 
        for (let i=0, len=palette.length; i < len; i++) {
          let color = new Matercolor(rgbToHex(palette[i])).palette
          brandPalette.push(color);          
        }
        console.log(JSON.stringify(brandPalette, null, 2));
    })
    .catch(err => { console.log(err) })
```
This code will log the Matercolor Palette Objects for every dominant color extracted from the image in a pretty format. 

### 🛣️ Roadmap

 - [x] Generate Primary Palette for any given color 
 - [x] ~~Generate Shades for Palette~~
 - [x] ~~Generate Accents for Palette~~ 
 - [x] Automatically selects Black or White as Contrast Text
 - [x] Generate Complementary Palette 
 - [x] Generate Analogous Palette
 - [x] Generate Triadic Palette
 - [x] Add Direct Dot Access to Constructor
 - [ ] Generate Tetradic Palette
 - [ ] Generate Split Complementary Palette
 - [ ] Update Demo Project to demonstrate Usage
 
### 👐 Contributing 
Pull requests are welcome. For major changes, please open an issue primary to discuss what you would like to change. Please make sure to create or update tests as appropriate.

### 🙏 Acknowledgements
* [edelstone/**material-palette-generator**](https://github.com/edelstone/material-palette-generator)
* [mbitson/**mcg**](https://github.com/mbitson/mcg)

### 📜 License
[MIT](https://choosealicense.com/licenses/mit/)
