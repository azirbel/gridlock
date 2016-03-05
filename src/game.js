import GameState from './game-state';
import GameEngine from './game-engine';
import Canvas from './canvas';

const FPS = 60;

export default class Game {
  constructor(canvasElement) {
    this.canvas = new Canvas(canvasElement);
    this.state = new GameState();
    this.engine = new GameEngine();

    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(this._loop.bind(this), 1000 / FPS);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  _loop() {
    this.engine.tick(this.state);
    this.canvas.render(this.state);
  }
}
