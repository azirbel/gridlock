'use strict'

require('./style.css');

import Game from './src/game';

let game = new Game();

window.toggleDriving = function() {
  game.toggleDriving();
}

document.addEventListener('DOMContentLoaded', (event) => {
  game.initialize(document.getElementById('canvas'),
                  document.body);
  game.start();
});
