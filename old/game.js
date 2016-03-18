import Canvas from './canvas';
import GameEngine from './game-engine';
import GameInteraction from './game-interaction';
import GameDisplay from './game-display';

import { cloneDeep } from 'lodash';

import Level1 from './levels/1-testing';

const FPS = 60;

export default class Game {
  initialize(canvasElement, bodyElement) {
    let canvas = new Canvas(canvasElement);
    // TODO(azirbel): Don't touch elements in game code, refactor this up a
    // level
    this.bodyElement = bodyElement;

    this.display = new GameDisplay(canvas);
    this.engine = new GameEngine();
    this.interactions = new GameInteraction(canvasElement);
    this.intervalId = null;

    this.newGame();
  }

  newGame() {
    this.bodyElement.classList.remove('win');
    this.bodyElement.classList.remove('loss');
    // TODO(azirbel): Needed?
    //this.state = Level1;
    this.state = cloneDeep(Level1);
    this.engine.initialize(this.state);
    this.interactions.initialize(this.state);
  }

  // Start the actual game loop. Shouldn't be used really.
  start() {
    this.intervalId = setInterval(this._loop.bind(this), 1000 / FPS);
  }

  // Stop the actual game loop. Shouldn't be used really.
  stop() {
    clearInterval(this.intervalId);
  }

  toggleDriving() {
    if (this.state.driving) {
      this.newGame();
    } else {
      this.state.driving = true;
    }
  }

  _loop() {
    if (this.state.driving) {
      this.engine.tick(this.state, 1 / FPS);
    }

    if (this.state.loss) {
      this.bodyElement.classList.add('loss');
    } else if (this.state.win) {
      this.bodyElement.classList.add('win');
    }

    this.display.render(this.state);
  }
}
