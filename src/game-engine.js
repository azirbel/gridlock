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
      let distance = car.speed / FPS;
      car.distanceOnPath += distance;
    });
  }

}
