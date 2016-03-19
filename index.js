require('./style.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import game from './reducers';
import Game from './components/game';

let store = createStore(game)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root')
  );
});
