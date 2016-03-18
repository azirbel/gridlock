import * as PathHelpers from './path-helpers';
import * as PointHelpers from './point-helpers';
import { every, isEqual, some } from 'lodash';

export default class GameEngine {
  initialize(state) {
    state.cars.map((car) => {
      let possiblePaths = PathHelpers.pathsFromPoint(
          state.paths,
          car.startingPoint);
      car.currentPath = possiblePaths[0];
      car.distanceOnPath = 0;
      car.position = car.startingPoint;
    });
  }

  tick(state, dt) {
    state.cars.map((car) => {
      this.advanceCarAlongPath(car, dt, state.paths, state.arrows, state);
      this.updateCarPosition(car);
    });

    if (some(state.cars, 'crashed')) {
      state.loss = true;
    }

    if (every(state.cars, 'inGoal')) {
      state.win = true;
    }
  }

  // TODO(azirbel): Refactor, just use state, or do it all better
  advanceCarAlongPath(car, dt, paths, arrows, state) {
    if (car.crashed || car.inGoal) return;

    let distanceOnPath = car.distanceOnPath + (car.speed * dt);

    if (distanceOnPath < PathHelpers.length(car.currentPath)) {
      car.distanceOnPath = distanceOnPath;
    } else {
      let newPath = null;
      let distanceOnNewPath = distanceOnPath - car.distanceOnPath;
      let possiblePaths =
          PathHelpers.pathsFromPoint(paths, car.currentPath.to)
          .filter((path) => path.to !== car.currentPath.from);
      let inboundDirection = PathHelpers.inboundDirection(car.currentPath);

      // TODO(azirbel): Resolve via arrows, or do nothing
      let matchingArrows = arrows.filter((arrow) => isEqual(arrow.from, car.currentPath.to));
      if (matchingArrows.length &&
          PathHelpers.outboundDirection(matchingArrows[0].path) !== inboundDirection) {
        // An arrow tells us which way to go
        newPath = matchingArrows[0].path;
      } else if (possiblePaths.length === 0) {
        // Dead end road

        // But maybe it's a goal?
        let matchingGoals = state.goals.filter((goal) => {
          return isEqual(goal.position, car.currentPath.to);
        });
        if (matchingGoals.length >= 1) {
          if (matchingGoals[0].isOccupied) {
            console.log('ALREADY OCCUPIED - CRASH');
            car.distanceOnPath = PathHelpers.length(car.currentPath);
            car.crashed = true;

            // HACK - mark all cars in the goal as crashed as well
            state.cars.map((car) => {
              if (isEqual(car.position, matchingGoals[0].position)) {
                car.crashed = true;
              }
            });

            return;
          } else {
            car.distanceOnPath = PathHelpers.length(car.currentPath);
            car.inGoal = true;
            matchingGoals[0].isOccupied = true;
            return;
          }
        }

        // Turn around
        newPath = PathHelpers.reversed(car.currentPath);
      } else if (possiblePaths.length === 1) {
        // No choice to make - only one way onward
        newPath = possiblePaths[0];
      } else {
        // More than one outbound path.
        let defaultDirection = PathHelpers.oppositeDirection(inboundDirection);

        let possiblePathsInDefaultDirection = possiblePaths.filter((path) => {
          return PathHelpers.outboundDirection(path) === defaultDirection;
        });

        if (possiblePathsInDefaultDirection.length !== 1) {
          console.log('CONFUSION - CRASH');
          car.distanceOnPath = PathHelpers.length(car.currentPath);
          car.crashed = true;
          return;
        }

        newPath = possiblePathsInDefaultDirection[0];
      }

      car.currentPath = newPath;
      car.distanceOnPath = distanceOnNewPath;
    }
  }

  updateCarPosition(car) {
    let path = car.currentPath;
    let distance = car.distanceOnPath;

    if (path.type === 'line') {
      let direction = PointHelpers.getVectorDirection(path.from, path.to);
      car.position = PointHelpers.plus(
          path.from,
          PointHelpers.scale(direction, distance));
    } else if (path.type === 'arc') {
      console.error('Arcs not yet supported.');
    }
  }
}
