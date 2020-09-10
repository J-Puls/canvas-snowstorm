# canvas-snowstorm ☃

A dynamically generated snow animation, written in TypeScript

## Usage

The `canvas-snowstorm` module exports a single function `snow`, which takes the following arguments:

- `speed: <number> default=1` - The speed factor at which the flakes fall
- `scale: <number> default=1` - The scale of the flakes
- `amount: <number> default=1` - The multiplication factor for flake amount \* 100 (1 = 100 flakes)
- `color: <string> default="white"` - The color of the flakes (a value of "random" will make every flake a different color)
- `fps: <number> default=60` - The frame rate of the animation (for a "smoother" animation, `speed` should be decreased as `fps` is increased)
- `el: <HTMLElement>` - The parent element the canvas is to be injected into
