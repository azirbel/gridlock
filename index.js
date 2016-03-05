'use strict'

require('./style.css');

import Game from './src/game';

document.addEventListener('DOMContentLoaded', (event) => {
  let game = new Game(document.getElementById('canvas'));
  game.start();
});
