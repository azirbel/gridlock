import * as PointHelpers from './point-helpers';

export default class Canvas {
  constructor(canvas) {
    this.pxSize = 600;
    this.gridSize = 9;

    this.ctx = canvas.getContext('2d');
  }

  render(state) {
    // Draw the background
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.pxSize, this.pxSize);

    // Draw dots for a grid
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        this.drawCircle([i, j], 0.02, '#333333');
      }
    }

    // Draw the paths
    state.paths.map((path) => {
      if (path.type === 'line') {
        this.drawLine(path.from, path.to, '#00AA00');
      } else if (path.type === 'arc') {
        this.drawArc(path.from,
                     path.to,
                     path.center,
                     '#00AA00',
                     path.counterclockwise);
      }
    });

    // Draw the car
    state.cars.map((car) => {
      let path = car.currentPath;
      let distance = car.distanceOnPath;

      if (path.type === 'line') {
        let direction = PointHelpers.getPointDirection(path.from, path.to);
        let position = PointHelpers.plus(
            path.from,
            PointHelpers.scale(direction, distance));

        this.drawCircle(position, 0.2, '#AA0000');
      } else if (path.type === 'arc') {
        console.log('cant handle arcs yet.');
      }
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
      this._gridToPx(PointHelpers.getManhattanDistance(from, center)),
      PointHelpers.getCardinalDirection(center, from) * Math.PI / 2,
      PointHelpers.getCardinalDirection(center, to) * Math.PI / 2,
      isCounterClockwise);
    this.ctx.stroke();
  }

  drawCircle(point, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this._gridToPx(point[0]),
      this._gridToPx(point[1]),
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
}
