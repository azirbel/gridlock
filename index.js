'use strict'

require("!style!css!./style.css");

class Canvas {
  constructor(canvas) {
    this.pxSize = 600;
    this.gridSize = 9;

    this.ctx = canvas.getContext('2d');
  }

  _gridToPx(g) {
    return g * this.pxSize / (this.gridSize + 1)
  }

  // Need to convert to use px values
  _drawRectDeprecated(rect, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...rect);
  }

  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this._gridToPx(x),
      this._gridToPx(y),
      this._gridToPx(radius),
      0,
      Math.PI * 2,
      true);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

class GameState {
  constructor(canvas) {
    this.canvas = canvas;
  }

  render() {
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        this.canvas.drawCircle(i, j, 0.02, '#333333');
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  let canvas = new Canvas(document.getElementById('canvas'));
  let state = new GameState(canvas);
  state.render();
});

console.log('loaded!');
