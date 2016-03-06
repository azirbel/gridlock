import * as PathHelpers from './path-helpers';
import * as PointHelpers from './point-helpers';

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
      this.advanceCarAlongPath(car, dt, state.paths);
      this.updateCarPosition(car);
    });
  }

  advanceCarAlongPath(car, dt, paths) {
    let distanceOnPath = car.distanceOnPath + (car.speed * dt);

    if (distanceOnPath < PathHelpers.pathLength(car.currentPath)) {
      car.distanceOnPath = distanceOnPath;
    } else {
      let distanceOnNewPath = distanceOnPath - car.distanceOnPath;
      let possiblePaths = PathHelpers.pathsFromPoint(
          paths,
          car.currentPath.to
        )
        .filter((path) => path.to !== car.currentPath.from);
      // TODO(azirbel): Resolve via directions, or do nothing
      let newPath = possiblePaths[0];

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
