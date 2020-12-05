import React, { useEffect, useState } from "react";
import Snow from "canvas-snowstorm";
import "./App.css";

function App() {
  let root;
  const [color, setColor] = useState({ h: 0, s: 50, l: 50 });
  const [snow, setSnow] = useState(new Snow({ color }));
  const [scale, setScale] = useState(1);
  const handleRandomize = () => snow && snow.randomizeColors();
  const handleColorChange = (e) => {
    snow && snow.changeColor({ h: e.target.value, s: 50, l: 50 });
  };

  useEffect(() => {
    snow.flakes && snow.changeColor(color);
  }, [snow.flakes, color]);

  useEffect(() => {
    root && snow.initialize(root);
    root && snow.inject();
    root && snow.start();
    window.snow = snow;
  }, [root, snow]);

  useEffect(() => {
    snow && snow.changeScale(scale);
  }, [scale, snow]);

  return (
    <div className="wrapper">
      <div className="controls">
        <p>☃ canvas-snowstorm ☃</p>
        <label htmlFor="scale">Scale: </label>
        <input
          name="scale"
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          onChange={(e) => setScale(e.target.value)}
          defaultValue={1}
        />
        <label htmlFor="color">Color</label>
        <input
          name="color"
          type="range"
          min={0}
          max={360}
          step={1}
          onChange={(e) => handleColorChange(e)}
          defaultValue={0}
        />
        <div className="btn-container">
          <button className="btn pause-btn" onClick={() => snow.pause()}>
            Pause
          </button>
          <button className="btn resume-btn" onClick={() => snow.play()}>
            Resume
          </button>
          <button
            className="btn randomize-btn"
            onClick={() => snow.randomizeColors()}
          >
            Randomize Colors
          </button>
        </div>
      </div>
      <div className="snowstorm" ref={(el) => (root = el)} />
      <div className="footer">
        <div>
          <p>
            Developed by:{" "}
            <a
              href="https://jpuls.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Jeff Puls
            </a>
          </p>
        </div>
        <div>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/j-puls/canvas-snowstorm"
              rel="noopener noreferrer"
              target="_blank"
            >
              canvas-snowstorm
            </a>
          </p>
        </div>
        <div>
          <p>
            NPM:{" "}
            <a
              href="https://www.npmjs.com/package/canvas-snowstorm"
              rel="noopener noreferrer"
              target="_blank"
            >
              canvas-snowstorm
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
