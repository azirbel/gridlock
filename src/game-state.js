export default class GameState {
  constructor() {
    this.driving = false;
    this.paths = [
      {
        // x, y, direction (0 is north, 1 is east)
        from: [1, 1, 1],
        to: [2, 1, 3]
      }
    ]
    this.cars = [
      {
        type: 0,
        currentPath: 0,
        distanceOnPath: 0
      }
    ];
  }
}
