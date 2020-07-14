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
   <img alt="NPM" src="https://img.shields.io/npm/l/@arvindcheenu/matercolor?style=flat-square">
  <br/> <br/>
  A tiny, <b>zero-dependency</b> libary for building harmonious material palettes for <b>any color</b>.
</p>
<p align="center">
<a href="https://github.com/arvindcheenu">Created with ❤️ by <b>Arvind Srinivasan.</b></a>
</p>


## 🎉 Installation

Use the package manager [npm](https://www.npmjs.com/) to install `matercolors` from commandline.

> **⚠️ Please Note!** <br>
> It is recommended to use the latest version as v1.0.1 had a bug introduced during linting. It has been **resolved in v1.0.2**.

```bash
npm i matercolors
```
Alternatively, you can update your `package.json` as:
```bash
"matercolors": "^1.0.2"
```
 ***...aand thats it! Now lets' dive right in!***

## 🚸 Usage
### 🎨 Palette Constructor

After installing, import and use the library like any ES6 default imports. For example like this:

```js
import Matercolor from '@arvindcheenu/matercolor'
let PurplePalette = new Matercolor('#6200EE')
```
Logging `PurplePalette` gives the output of the constructor with the following organisation.
```js
Matercolor {
  color: '#6200EE',
  options: { threshold: 128, light: 200, main: 500, dark: 700 },
  palette: [Function] }
```
### 🔧 Options
As you can see from the constructor, currently **Matercolor** offers **4** options for configuration.

| Options | Type | Default | What it does |
|-|-|-|-|
| `light` |`Number`| `200` | Assigns **light** to the palette object with given key |
| `main` |`Number`| `500` | Assigns  **main**  to the palette object with given key |
| `dark` |`Number`| `700` | Assigns  **dark**  to the palette object with given key |
| `threshold` |`Number`| `128` | Sets the **Contrast threshold** for the foreground text|

### 🎛️ Palette Methods
The following methods are available as of version **1.0.0**. 
| Method | Type | What it returns |
|-|-|-|
| `.palette()` | `Getter` | A Material Palette Object with Text Contrast Values for the given color |
| `.shades()` | `Getter` | Light, Main and Dark shades for the given color |
| `.accents()` | `Getter` | Accent Color Palette for the given color |

#### 🏗️ Palette Object Structure
Logging the palette output for the `PurplePalette` color by

```
PurplePalette.palette()
```
we get an output that follows the following structure.

```js
{
  primary : { // type of palette
    50 : { // lightest color in palette
        hex  : String, // Valid Hex Color Code
        rgb  : {r: Number, g: Number, b: Number, string: String}
        hsl  : {h: Number, s: Number, l: Number, string: String},
        cymk : {c: Number, y: Number, m: Number, k: Number, string: String},
        contrastText: 'white'|'black' },
    100 : [Object],
    200 : [Object],
    ...
    900 : [Object], // darkest color in palette
    // Accents 
    A100 : [Object],
    A200 : [Object],
    A400 : [Object],
    A700 : [Object],
  } // ...More coming soon
}
```
> All the other functions are simply helpers to access specific parts of the complete palette. 

If we do not change the defaults, getting the **shades** of the above color is as simple as
```js
PurplePalette.shades("primary") // where primary is a palette type
```
which returns the **light**, **main** and **dark** variants of the color (see below). The choice of these palettes can be configured through tweaking the [**options**](#🔧-options).

```js
{
  "light": {
    "hex": "#b894f6",
    "rgb": {
      "r": 184,
      "g": 148,
      "b": 246,
      "string": "rgb(184,148,246)"
    },
    "hsl": {
      "h": 262,
      "s": 84.5,
      "l": 77.3,
      "string": "hsl(262,84.5%,77.3%)"
    },
    "cymk": {
      "c": 25.2033,
      "y": 0,
      "m": 39.8374,
      "k": 3.5294,
      "string": "cymk(25.2033%,0%,39.8374%,3.5294%)"
    },
    "contrastText": "black"
  },
  "main": {
    "hex": "#6200ee",
    "rgb": {
      "r": 98,
      "g": 0,
      "b": 238,
      "string": "rgb(98,0,238)"
    },
    "hsl": {
      "h": 265,
      "s": 100,
      "l": 46.7,
      "string": "hsl(265,100%,46.7%)"
    },
    "cymk": {
      "c": 58.8235,
      "y": 0,
      "m": 100,
      "k": 6.6667,
      "string": "cymk(58.8235%,0%,100%,6.6667%)"
    },
    "contrastText": "white"
  },
  "dark": {
    "hex": "#3f00e0",
    "rgb": {
      "r": 63,
      "g": 0,
      "b": 224,
      "string": "rgb(63,0,224)"
    },
    "hsl": {
      "h": 257,
      "s": 100,
      "l": 43.9,
      "string": "hsl(257,100%,43.9%)"
    },
    "cymk": {
      "c": 71.875,
      "y": 0,
      "m": 100,
      "k": 12.1569,
      "string": "cymk(71.875%,0%,100%,12.1569%)"
    },
    "contrastText": "white"
  }
}
```

Similarly, for extracting the **accents** from the palette object, we can use:
```js
PurplePalette.accents("primary") // where primary is a palette type
```
which, for the given color, generates the output:

```js
{
  "A100": {
    "hex": "#b388ff",
    "rgb": {
      "r": 179,
      "g": 136,
      "b": 255,
      "string": "rgb(179,136,255)"
    },
    "hsl": {
      "h": 262,
      "s": 100,
      "l": 76.7,
      "string": "hsl(262,100%,76.7%)"
    },
    "cymk": {
      "c": 29.8039,
      "y": 0,
      "m": 46.6667,
      "k": 0,
      "string": "cymk(29.8039%,0%,46.6667%,0%)"
    },
    "contrastText": "black"
  },
  "A200": {
    "hex": "#7c4dff",
    "rgb": {
      "r": 124,
      "g": 77,
      "b": 255,
      "string": "rgb(124,77,255)"
    },
    "hsl": {
      "h": 256,
      "s": 100,
      "l": 65.1,
      "string": "hsl(256,100%,65.1%)"
    },
    "cymk": {
      "c": 51.3725,
      "y": 0,
      "m": 69.8039,
      "k": 0,
      "string": "cymk(51.3725%,0%,69.8039%,0%)"
    },
    "contrastText": "white"
  },
  "A400": {
    "hex": "#6420ff",
    "rgb": {
      "r": 100,
      "g": 32,
      "b": 255,
      "string": "rgb(100,32,255)"
    },
    "hsl": {
      "h": 258,
      "s": 100,
      "l": 56.3,
      "string": "hsl(258,100%,56.3%)"
    },
    "cymk": {
      "c": 60.7843,
      "y": 0,
      "m": 87.451,
      "k": 0,
      "string": "cymk(60.7843%,0%,87.451%,0%)"
    },
    "contrastText": "white"
  },
  "A700": {
    "hex": "#6200ee",
    "rgb": {
      "r": 98,
      "g": 0,
      "b": 238,
      "string": "rgb(98,0,238)"
    },
    "hsl": {
      "h": 265,
      "s": 100,
      "l": 46.7,
      "string": "hsl(265,100%,46.7%)"
    },
    "cymk": {
      "c": 58.8235,
      "y": 0,
      "m": 100,
      "k": 6.6667,
      "string": "cymk(58.8235%,0%,100%,6.6667%)"
    },
    "contrastText": "white"
  }
}
```
These outputs can also be used in conjunction with [Material UI's](https://material-ui.com/) 
[**createMuiTheme**](https://material-ui.com/customization/theming/#createmuitheme-options-args-theme) to configure custom palettes. For a better understanding, you can checkout the demo.

### 🕹️ Demo Project

*🚧🚧🚧&nbsp;&nbsp; **CONSTRUCTION IN PROGRESS** &nbsp;&nbsp;🚧🚧🚧*

### 🛣️ Roadmap
#### Current Stable Release

 - [x] Generate Primary Palette for any given color 
 - [x] Generate Accents for Palette 
 - [x] Get Contrast Colors for Foreground Text

#### Next Possible Stable Release

 - [ ] Generate Complementary Palette 
 - [ ] Generate Analogous Palette
 - [ ] Generate Triadic Palette

#### The Future

 - [ ] Coming soon
 
### 👐 Contributing 
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to create or update tests as appropriate.

### Acknowledgements
* [edelstone/**material-palette-generator**](https://github.com/edelstone/material-palette-generator)
* [mbitson/**mcg**](https://github.com/mbitson/mcg)

### 📝 License
[MIT](https://choosealicense.com/licenses/mit/)
