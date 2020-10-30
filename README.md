# ☃ canvas-snowstorm ☃

A dynamically generated HTML snow animation, written in TypeScript.

## Installation

```bash
npm i canvas-snowstorm
```

## Development

Ensure TypeScript is enabled:

```bash
tsc -version
```

To build, run:

```bash
npm run-script build
```

## Usage

The `canvas-snowstorm` module exports a single constructor `snow`, which takes the following arguments:

- `speed: <number> default=1` - The speed factor at which the flakes fall
- `scale: <number> default=1` - The scale of the flakes
- `amount: <number> default=1` - The multiplication factor for flake amount \* 100 (1 = 100 flakes)
- `color: <string> default="white"` - The color of the flakes (a value of "random" will make every flake a different color)
- `fps: <number> default=30` - The frame rate of the animation (for a "smoother" animation, `speed` should be decreased as `fps` is increased)
- `w: <number> default=window.innerWidth` - The width of the canvas to be generated
- `h: <number> default=window.innerHeight` - The height of the canvas to be generated
- `el: <HTMLElement>` - The parent element the canvas is to be injected into

**Note:** Increasing the "amount" and/or "fps" factors can be taxing on the CPU/GPU and result in jittery animation

## Methods

- start() : injects canvas into parent and begins animation
- play() : un-pauses animation
- pause() : pauses animation
- changeScale(s) : updates scale of flakes (must be positive number)

### Example over solid color

#### HTML

```html
<div id="myContainer"></div>
```

#### CSS

```css
#myContainer {
  background-color: black;
  width: 800px;
  height: 600px;
}
```

#### JavaScript

```javascript
import Snow from "canvas-snowstorm";

const parentDiv = document.getElementById("myContainer");

const snow = new Snow(1, 1, 2, "white", 60, 800, 600, parentDiv);
```

#### Output

![example 1](https://i.ibb.co/Db3FpJz/example.gif)

### Example over image

#### HTML

```html
<div id="myContainer"></div>
```

#### CSS

```css
#myContainer {
  background-image: url("https://cdn.pixabay.com/photo/2016/10/21/14/46/norway-1758183_960_720.jpg");
  width: 800px;
  height: 600px;
}
```

#### JavaScript

```javascript
import { snow } from "canvas-snowstorm";

const parentDiv = document.getElementById("myContainer");

new Snow(1, 1, 2, "white", 60, 800, 600, parentDiv);
```

![example 2](https://i.ibb.co/jMLCGZD/example-2.gif)
