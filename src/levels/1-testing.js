export default {
  driving: false,

  paths: [
    // Spliney thing
    { type: 'line', from: [1, 1], to: [2, 1] },
    { type: 'line', from: [3, 2], to: [3, 3] },
    { type: 'line', from: [5, 5], to: [6, 5] },
    { type: 'arc', from: [2, 1], to: [3, 2], center: [2, 2], clockwise: true },
    { type: 'arc', from: [3, 3], to: [5, 5], center: [5, 3], clockwise: false },
    // Box
    { type: 'line', from: [1, 5], to: [2, 5] },
    { type: 'line', from: [2, 5], to: [2, 6] },
    { type: 'line', from: [2, 6], to: [1, 6] },
    { type: 'line', from: [1, 6], to: [1, 5] },
    // Maze
    { type: 'line', from: [4, 7], to: [5, 7] },
    { type: 'line', from: [5, 7], to: [6, 7] },
    { type: 'line', from: [6, 7], to: [7, 7] },
    { type: 'line', from: [7, 7], to: [7, 8] },
    { type: 'line', from: [7, 8], to: [6, 8] },
    { type: 'line', from: [6, 8], to: [6, 7] },
    { type: 'line', from: [7, 7], to: [8, 7] },
    { type: 'line', from: [7, 7], to: [7, 6] },
  ],

  cars: [
    {
      type: 0,
      startingPoint: [4, 7],
      speed: 1,
      crashed: false,
      currentPath: null,
      distanceOnPath: null,
      position: null
    }
  ],

  arrows: []
}
