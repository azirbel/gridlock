import * as PathHelpers from './path-helpers';
import * as PointHelpers from './point-helpers';
import { isEqual } from 'lodash';

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
      this.advanceCarAlongPath(car, dt, state.paths, state.arrows);
      this.updateCarPosition(car);
    });
  }

  advanceCarAlongPath(car, dt, paths, arrows) {
    let distanceOnPath = car.distanceOnPath + (car.speed * dt);

    if (distanceOnPath < PathHelpers.pathLength(car.currentPath)) {
      car.distanceOnPath = distanceOnPath;
    } else {
      let newPath = null;
      let distanceOnNewPath = distanceOnPath - car.distanceOnPath;

      // TODO(azirbel): Resolve via arrows, or do nothing
      let matchingArrows = arrows.filter((arrow) => isEqual(arrow.from, car.currentPath.to));
      if (matchingArrows.length) {
        newPath = matchingArrows[0].path;
      } else {
        let possiblePaths = PathHelpers.pathsFromPoint(
            paths,
            car.currentPath.to
          )
          .filter((path) => path.to !== car.currentPath.from);

        // If no paths, go back the way we came
        if (possiblePaths.length === 0) {
          possiblePaths = PathHelpers.pathsFromPoint(
              paths,
              car.currentPath.to
            )
        }

        newPath = possiblePaths[0];
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
