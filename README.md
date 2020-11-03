# ☃ canvas-snowstorm ☃

A dynamically generated HTML Canvas snow animation, written in TypeScript.

[View live preview](https://canvas-snowstorm.jpuls.dev)

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
npm run build
```

## Usage

The `canvas-snowstorm` module exports a single constructor `snow`, which takes the following arguments:

- `speed: <number> default=1` - The velocity at which the flakes fall
- `scale: <number> default=1` - The scale of the flakes in `px`
- `amount: <number> default=100` - The amount of flakes to be generated
- `color: <string> default="white"` - The color of the flakes (a value of "random" will make every flake a different color)
- `fps: <number> default=30` - The frame rate of the animation
- `w: <number> default=window.innerWidth` - The width of the canvas to be generated
- `h: <number> default=window.innerHeight` - The height of the canvas to be generated
- `el: <HTMLElement> default=document.body` - The parent element the canvas is to be injected into

**Note:** Increasing the `amount` and/or `fps` factors can be taxing on the CPU/GPU and result in jittery animation

## Methods

- `start()` : injects canvas into parent and begins animation
- `play()` : un-pauses animation
- `pause()` : pauses animation
- `changeScale(s)` : updates scale of flakes (must be positive number)

## Example

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

const snow = new Snow(1, 1, 100, "white", 60, 800, 600, parentDiv);
```

#### Output

![example 1](https://i.ibb.co/PGFmLjY/snow1.gif)
