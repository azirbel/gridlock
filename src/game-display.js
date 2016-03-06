export default class GameDisplay {
  constructor(canvas) {
    this.canvas = canvas;
  }

  render(state) {
    this.canvas.fillBackground();

    // Draw dots for a grid
    // Temporary - will be removed once the graphics are done.
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        this.canvas.drawCircle([i, j], 0.02, '#333333');
      }
    }

    // Draw the paths
    state.paths.map((path) => {
      if (path.type === 'line') {
        this.canvas.drawLine(path.from, path.to, '#00AA00');
      } else if (path.type === 'arc') {
        this.canvas.drawArc(path.from,
                     path.to,
                     path.center,
                     '#00AA00',
                     path.clockwise);
      }
    });

    // Draw the cars
    state.cars.map((car) => {
      this.canvas.drawCircle(car.position, 0.2, '#AA0000');
    });
  }
}
