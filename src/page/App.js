import './App.css';
import React, { useEffect } from "react";
import LineChart from '../component/LineChart.js';
import Canvas from '../util/Canvas';

function init() {
  const canvasInstance = new Canvas({ domId: 'canvas' });

  window.canvasInstance = canvasInstance;
}

function setOption(option) {
  const canvasInstance = window.canvasInstance;
  const canvas = canvasInstance.canvas;
  const ctx = canvasInstance.ctx;

  // 首次绘制
  const lineChart = new LineChart(canvas, ctx, option);
  lineChart.render();
  // 更新事件
  canvasInstance.addShape(lineChart);
  canvasInstance.initEvent();
}


function App() {

  useEffect(() => {
    // 1.初始化画布
    init();
    // 2.首次绘制
    const option = {
      data: [50,45,46,42,40,42,35],
      xAxis: [10,11,12,13,14, 15,16],
      yAxis: [30,40,50,60],
      canvas: {
        x: 0,
        y: 0,
        width: 600,
        height: 400
      }
    };
    setOption(option);
  }, []);

  return (
    <div className="App">

      <canvas 
        id="canvas"
        width="600" 
        height="300"
      ></canvas>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
