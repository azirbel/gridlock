import Canvas from './canvas';
import GameEngine from './game-engine';
import GameDisplay from './game-display';

import Level1 from './levels/1-testing';

const FPS = 60;

export default class Game {
  constructor(canvasElement) {
    let canvas = new Canvas(canvasElement);

    this.display = new GameDisplay(canvas);
    this.engine = new GameEngine();
    this.state = Level1;

    this.engine.initialize(this.state);
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(this._loop.bind(this), 1000 / FPS);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  _loop() {
    this.engine.tick(this.state, 1 / FPS);
    this.display.render(this.state);
  }
}
