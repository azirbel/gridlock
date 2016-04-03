require('./style.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import game from './reducers';
import Game from './components/game';
import { tick } from './actions';

let store = createStore(game)

let lastTime = null
let rafTick = (timestamp) => {
  let dt = timestamp - lastTime
  lastTime = timestamp

  if (dt > 0) {
    store.dispatch(tick(dt))
  }

  requestAnimationFrame(rafTick);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('hi')
  lastTime = performance.now()
  requestAnimationFrame(rafTick)

  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root')
  );
});
