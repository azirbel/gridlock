export default class GameState {
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
