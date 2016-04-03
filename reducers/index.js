import { assign, cloneDeep, mapValues } from 'lodash';

import initialState from './initial-state';

let tick = (level) => {
  console.log('game loop')

  // TODO(azirbel): Use ImmutableJS instead
  let newLevel = cloneDeep(level)

  // Update all the cars
  newLevel.state.cars = mapValues(level.state.cars, (carState, carId) => {
    let carConfig = newLevel.config.cars[carId]
    debugger
  })

  return newLevel
}

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      if (state.driving) {
        // TODO(azirbel): Refactor
        let newLevels = {}
        newLevels[state.level] = tick(state.levels[state.level])
        return assign({}, state, { levels: newLevels })
      } else {
        return state
      }

    case 'SET_LEVEL':
      return state;

    case 'TOGGLE_DRIVING':
      return assign({}, state, { driving: !state.driving });

    default:
      return state;
  }
}

export default game;
