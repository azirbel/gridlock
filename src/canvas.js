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
    state.paths.map((path) => {
      if (path.type === 'line') {
        this.drawLine(path.from, path.to, '#00AA00');
      } else if (path.type === 'arc') {
        this.drawArc(path.from, path.to, path.center, '#00AA00', path.counterclockwise);
      }
    });

    // Draw the car
    state.cars.map((car) => {
      this.drawCircle(state.paths[0].from[0], state.paths[0].from[1], 0.2, '#AA0000');
    });
  }

  drawLine(from, to, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(...this._gridToPx(from));
    this.ctx.lineTo(...this._gridToPx(to));
    this.ctx.stroke();
  }

  drawArc(from, to, center, color, isCounterClockwise = false) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      ...this._gridToPx(center),
      this._gridToPx(this._getManhattanDistance(from, center)),
      this._getCardinalDirection(center, from) * Math.PI / 2,
      this._getCardinalDirection(center, to) * Math.PI / 2,
      isCounterClockwise);
    this.ctx.stroke();
  }

  _getCardinalDirection(from, to) {
    if (from[0] === to[0]) {
      // North or south
      return (to[1] > from[1]) ? 1 : 3;
    } else if (from[1] === to[1]) {
      // East or west
      return (to[0] > from[0]) ? 0 : 2;
    } else {
      return null;
    }
  }

  _getManhattanDistance(from, to) {
    return Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
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
    if (Array.isArray(g)) {
      return g.map((num) => this._gridToPx(num));
    } else {
      return g * this.pxSize / (this.gridSize + 1)
    }
  }

  // Need to convert to use px values
  _drawRectDeprecated(rect, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...rect);
  }
}
