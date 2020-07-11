<img width=400 src="images/logo.png"/>

A tiny, **zero-dependency** libary for building harmonious material palettes for **any color**.

[Created with ❤️ by **Arvind Srinivasan.**](https://github.com/arvindcheenu)

## 🎉 Installation

Use the package manager [npm](https://www.npmjs.com/) to install `@arvindcheenu/matercolor` from commandline.

```bash
npm i @arvindcheenu/matercolor@1.0.0
```
Alternatively, you can update your `package.json` as:
```bash
"@arvindcheenu/matercolor": "1.0.0"
```

## 🚸 Usage
### 🎨 Palette Constructor

After installing, import and use the library like any ES6 default imports. For example like this:

```js
import Matercolor from 'matercolor'
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
{ light:
   { hex: '#626262',
     rgb: { r: 98, g: 98, b: 98, string: 'rgb(98,98,98)' },
     hsl: { h: 0, s: 0, l: 38.4, string: 'hsl(0,0%,38.4%)' },
     cymk:
      { c: 0, y: 0, m: 0, k: 61.5686, string: 'cymk(0%,0%,0%,61.5686%)' },
     contrastText: 'white' },
  main:
   { hex: '#6200ee',
     rgb: { r: 98, g: 0, b: 238, string: 'rgb(98,0,238)' },
     hsl: { h: 265, s: 100, l: 46.7, string: 'hsl(265,100%,46.7%)' },
     cymk:
      { c: 58.8235,
        y: 0,
        m: 100,
        k: 6.6667,
        string: 'cymk(58.8235%,0%,100%,6.6667%)' },
     contrastText: 'white' },
  dark:
   { hex: '#620062',
     rgb: { r: 98, g: 0, b: 98, string: 'rgb(98,0,98)' },
     hsl: { h: 300, s: 100, l: 19.2, string: 'hsl(300,100%,19.2%)' },
     cymk:
      { c: 0,
        y: 0,
        m: 100,
        k: 61.5686,
        string: 'cymk(0%,0%,100%,61.5686%)' },
     contrastText: 'white' } }
```

Similarly, for extracting the **accents** from the palette object, we can use:
```js
PurplePalette.accents("primary") // where primary is a palette type
```
which, for the given color, generates the output:

```js
{ A100:
   { hex: '#626262',
     rgb: { r: 98, g: 98, b: 98, string: 'rgb(98,98,98)' },
     hsl: { h: 0, s: 0, l: 38.4, string: 'hsl(0,0%,38.4%)' },
     cymk:
      { c: 0, y: 0, m: 0, k: 61.5686, string: 'cymk(0%,0%,0%,61.5686%)' },
     contrastText: 'white' },
  A200:
   { hex: '#626262',
     rgb: { r: 98, g: 98, b: 98, string: 'rgb(98,98,98)' },
     hsl: { h: 0, s: 0, l: 38.4, string: 'hsl(0,0%,38.4%)' },
     cymk:
      { c: 0, y: 0, m: 0, k: 61.5686, string: 'cymk(0%,0%,0%,61.5686%)' },
     contrastText: 'white' },
  A400:
   { hex: '#626262',
     rgb: { r: 98, g: 98, b: 98, string: 'rgb(98,98,98)' },
     hsl: { h: 0, s: 0, l: 38.4, string: 'hsl(0,0%,38.4%)' },
     cymk:
      { c: 0, y: 0, m: 0, k: 61.5686, string: 'cymk(0%,0%,0%,61.5686%)' },
     contrastText: 'white' },
  A700:
   { hex: '#6200ee',
     rgb: { r: 98, g: 0, b: 238, string: 'rgb(98,0,238)' },
     hsl: { h: 265, s: 100, l: 46.7, string: 'hsl(265,100%,46.7%)' },
     cymk:
      { c: 58.8235,
        y: 0,
        m: 100,
        k: 6.6667,
        string: 'cymk(58.8235%,0%,100%,6.6667%)' },
     contrastText: 'white' } }

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
- [ ] Coming soon...
 
### 👐 Contributing 
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to create or update tests as appropriate.

### Acknowledgements
* [edelstone/**material-palette-generator**](https://github.com/edelstone/material-palette-generator)
* [mbitson/**mcg**](https://github.com/mbitson/mcg)

### 📝 License
[MIT](https://choosealicense.com/licenses/mit/)
