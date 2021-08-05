import './App.css';
import React, { useEffect } from "react";
import LineChart from './Chart.js';

function init() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  window.ctx = ctx;
}

function setOption(option) {
  const ctx = window.ctx;

  const lineChart = new LineChart(ctx, option);
  lineChart.render();
}


function App() {

  useEffect(() => {
    // 1.初始化画布
    init();
    // 2.首次绘制
    const option = {
      data: [50,45,46,42,40,42,35],
      xAxis: [10,11,12,13,14, 15,16],
      yAxis: [30,40,50,60]
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
