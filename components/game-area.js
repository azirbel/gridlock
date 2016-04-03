import React from 'react';
import Path from './path';
import Goal from './goal';
import Car from './car';

import { mapValues, values } from 'lodash';

export default class GameArea extends React.Component {
  // Build an object which has all the information needed to render a car
  getCarData(carConfig, carId) {
    let carState = this.props.state.cars[carId]

    return {
      id: carConfig.id,
      type: carConfig.type,
      pos: carState.pos || carConfig.startPos,
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
            key={path.id}
            type={path.type}
            from={path.from}
            to={path.to}
          />
        }) }

        { this.props.config.goals.map((goal) => {
          return <Goal
            key={goal.id}
            type={goal.type}
            pos={goal.pos}
          />
        }) }

        { values(mapValues(this.props.config.cars, (carConfig, carId) => {
          return <Car
            key={carId}
            {...this.getCarData(carConfig, carId)}
          />
        })) }
      </svg>
    )
  }
}
