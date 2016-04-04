import React from 'react';
import Path from './path';
import Goal from './goal';
import Car from './car';

import { map, values } from 'lodash';

export default class GameArea extends React.Component {
  // Build an object which has all the information needed to render a car
  getCarData(carConfig) {
    let carState = this.props.state.cars[carConfig.id]

    // TODO(azirbel): HACK around initialState poor setting
    let leaderPos = null
    if (carState.leader && carState.leader.pos) {
      leaderPos = carState.leader.pos
    }

    return {
      id: carConfig.id,
      type: carConfig.type,
      pos: leaderPos || carState.pos || carConfig.startPos,
      speed: carConfig.speed,
      crashed: carState.crashed,
      inGoal: carState.inGoal,
      currentPath: carState.currentPath,
      distanceOnPath: carState.distanceOnPath,
    }
  }

  render() {
    return (
      <svg width="600" height="600" viewBox="0 0 11 11">
        { this.props.config.paths.map((path) => {
          return <Path
            // TODO(azirbel): Check if these keys are working
            key={path.from.concat(path.to)}
            type={path.type}
            from={path.from}
            to={path.to}
          />
        }) }

        { this.props.config.goals.map((goal) => {
          return <Goal
            key={goal.pos}
            type={goal.type}
            pos={goal.pos}
          />
        }) }

        { values(map(this.props.config.cars, (carConfig) => {
          return <Car
            key={carConfig.id}
            {...this.getCarData(carConfig)}
          />
        })) }
      </svg>
    )
  }
}
