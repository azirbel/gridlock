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
  let dtMillis = timestamp - lastTime
  lastTime = timestamp

  if (dtMillis > 0) {
    store.dispatch(tick(dtMillis / 1000))
  }

  requestAnimationFrame(rafTick);
}

document.addEventListener('DOMContentLoaded', () => {
  lastTime = performance.now()
  requestAnimationFrame(rafTick)

  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root')
  );
});
