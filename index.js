'use strict'

import Game from './src/game';

require('./style.css');

document.addEventListener('DOMContentLoaded', function(event) {
  let game = new Game(document.getElementById('canvas'));
  game.run();
});

console.log('loaded!');
