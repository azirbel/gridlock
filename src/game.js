import GameState from './game-state';
import Canvas from './canvas';

export default class Game {
  constructor(canvasElement) {
    this.canvas = new Canvas(canvasElement);
    this.state = new GameState(this.canvas);
  }

  run() {
    console.log('running game');
    this.state.render();
  }
}
