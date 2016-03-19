import { assign } from 'lodash';

let initialState = require('./initial-state');

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return state;

    case 'SET_LEVEL':
      return state;

    case 'TOGGLE_DRIVING':
      return assign({}, state, { driving: !state.driving });

    default:
      return state;
  }
}

export default game;
