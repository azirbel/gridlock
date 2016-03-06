export default class GameState {
  constructor() {
    this.driving = false;

    // curved lines should always be clockwise
    this.paths = [
      {
        type: 'line',
        from: [1, 1],
        to: [2, 1]
      },
      {
        type: 'line',
        from: [3, 2],
        to: [3, 3]
      },
      {
        type: 'line',
        from: [5, 5],
        to: [6, 5]
      },
      {
        type: 'arc',
        from: [2, 1],
        to: [3, 2],
        center: [2, 2],
        counterclockwise: false
      },
      {
        type: 'arc',
        from: [3, 3],
        to: [5, 5],
        center: [5, 3],
        counterclockwise: true
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
