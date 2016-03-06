// TODO(azirbel): Refactor to a game-config file
const FPS = 60;

export default class GameEngine {
  constructor() {
  }

  initialize(state) {
    state.cars.map((car) => {
      car.currentPath = state.pathsAtPoint(car.startingPoint)[0];
      car.distanceOnPath = 0;
    });
  }

  tick(state) {
    state.cars.map((car) => {
      let distanceOnPath = car.distanceOnPath + (car.speed / FPS);

      if (distanceOnPath < state.pathDistance(car.currentPath)) {
        car.distanceOnPath = distanceOnPath;
      } else {
        let distanceOnNewPath = distanceOnPath - car.distanceOnPath;
        let possibleNewPaths = state.pathsAtPoint(car.currentPath.to)
          .filter((path) => path.to !== car.currentPath.from);
        let newPath = possibleNewPaths[0];

        car.currentPath = newPath;
        car.distanceOnPath = distanceOnNewPath;
      }
    });
  }
}
