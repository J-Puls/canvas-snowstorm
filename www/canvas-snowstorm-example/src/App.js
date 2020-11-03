import React, { useEffect, useState } from "react";
import Snow from "canvas-snowstorm";
import "./App.css";

function App() {
  let root;
  const [snow, setSnow] = useState(null);
  const [scale, setScale] = useState(1);
  const handleRandomize = (e) => {
    const color = e.target.checked ? "random" : "white";
    const canvas = root.firstChild;
    root.removeChild(canvas);
    setSnow(new Snow(1, 1, 300, color, 30, root.width, root.height, root));
  };

  useEffect(() => {
    setSnow(new Snow(1, 1, 300, "white", 30, root.width, root.height, root));
  }, [root]);

  useEffect(() => {
    snow && snow.start();
  }, [snow]);

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
        <label htmlFor="random-color">Randomize Colors </label>
        <input
          type="checkbox"
          name="random-color"
          defaultChecked={false}
          onChange={(e) => handleRandomize(e)}
        />
        <div className="btn-container">
          <button className="btn pause-btn" onClick={() => snow.pause()}>
            Pause
          </button>
          <button className="btn resume-btn" onClick={() => snow.play()}>
            Resume
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
