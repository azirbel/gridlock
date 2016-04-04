import Immutable from 'immutable'
import * as Path from '../helpers/path'

import initialState from './initial-state';

let tickLeader = (leader, carConfig, levelConfig, dt) => {
  // Initial state
  if (!leader) {
    leader = Immutable.Map({
      currentPath: Path.pathsFromPoint(levelConfig.get('paths'),
                                       carConfig.get('startPos')).first(),
      distanceOnPath: 0,
      pos: carConfig.startPos
    })
  }

  let newProps = {
    currentPath: leader.get('currentPath'),
    distanceOnPath: leader.get('distanceOnPath') + (carConfig.get('speed') * dt)
  }

  // Transition to a new path if necessary
  if (newProps.distanceOnPath >= Path.length(leader.get('currentPath'))) {
    newProps.distanceOnPath -= Path.length(leader.get('currentPath'))

    let possiblePaths =
      Path.pathsFromPoint(levelConfig.get('paths'),
                          leader.getIn(['currentPath', 'to']))

    newProps.currentPath = possiblePaths.first()
  }

  // Update grid position according to path
  newProps.pos = Path.getPointAlongPath(newProps.currentPath,
                                        newProps.distanceOnPath)

  return leader.merge(newProps)
}

let tickCar = (carState, carConfig, levelConfig, dt) => {
  if (carState.crashed || carState.inGoal) {
    return carState;
  }

  let newLeader =
      tickLeader(carState.get('leader'), carConfig, levelConfig, dt);

  return carState.set('leader', newLeader);
}

let tickLevel = (levelState, levelConfig, dt) => {
  // The greatest variable name ever?
  // Obviously, a list of cars keyed by car id.
  let keyedCars = levelConfig.get('cars').map((carConfig) => {
    return [
      carConfig.get('id'),
      tickCar(
          levelState.getIn(['cars', carConfig.get('id')]),
          carConfig,
          levelConfig,
          dt)
    ]
  })
  return levelState.set('cars', Immutable.Map(keyedCars))
}

// TODO(azirbel): Need to fix initialState so that we don't rely on the level
// state being prepopulated
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      if (state.get('driving')) {
        console.log('tick')
        let levelStr = state.get('level').toString()
        let newLevelState = tickLevel(
            state.getIn(['levels', levelStr, 'state']),
            state.getIn(['levels', levelStr, 'config']),
            action.dt)
        return state.setIn(['levels', levelStr, 'state'], newLevelState)
      } else {
        return state
      }

    case 'SET_LEVEL':
      return state;

    case 'TOGGLE_DRIVING':
      return state.update('driving', d => !d)

    default:
      return state;
  }
}

export default reducer;
