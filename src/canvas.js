export default class Canvas {
  constructor(canvas) {
    this.pxSize = 600;
    this.gridSize = 9;

    this.ctx = canvas.getContext('2d');
  }

  render(state) {
    // Draw dots for a grid
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        this.drawCircle(i, j, 0.02, '#333333');
      }
    }

    // Draw the paths

    // Draw the car
    // TODO(azirbel): Lodash
    for (let i = 0; i < state.cars.length; i++) {
      let car = state.cars[i];

      this.drawCircle(state.paths[0].from[0], state.paths[0].from[1], 0.2, '#AA0000');
    }
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

  _gridToPx(g) {
    return g * this.pxSize / (this.gridSize + 1)
  }

  // Need to convert to use px values
  _drawRectDeprecated(rect, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...rect);
  }
}
