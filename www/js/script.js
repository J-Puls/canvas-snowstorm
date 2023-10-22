import Snow from "./dist/index.js";

const hueInput = document.querySelector("#hue");
const scaleInput = document.querySelector("#scale");
const speedInput = document.querySelector("#speed");
const playPause = document.querySelector("#playPause");
const changeShape = document.querySelector("#changeShape");
const randomize = document.querySelector("#randomize");
const reset = document.querySelector("#reset");

const parent = document.querySelector(".snowstorm-container");
globalThis.snowParent = parent;

const snow = new Snow({
  color: { h: 180, s: 100, l: 75 },
  speed: 1,
  amount: 1000,
  fps: 30,
  scale: 2
});

globalThis.snow = snow;

changeShape.onclick = () => snow.cycleShape();
randomize.onclick = () => snow.randomizeColors();
reset.onclick = () => {
  hueInput.value = 180;
  scaleInput.value = 1;
  snow.restart();
  
};
hueInput.addEventListener("input", () =>
  snow.changeColor({ h: hueInput.value, s: 100, l: 50 })
);

scaleInput.addEventListener("input", () => snow.changeScale(scaleInput.value));

speedInput.addEventListener("input", () => snow.changeSpeed(speedInput.value));

playPause.onclick = () => {
  snow.toggle();
  playPause.innerHTML = snow.isPaused ? "Play" : "Pause";
  playPause.style.backgroundColor = snow.isPaused ? "forestgreen" : "maroon";
};

snow.autostart(parent);
