export default {
  driving: false,

  paths: [
    { type: 'line', from: [1, 1], to: [2, 1] },
    { type: 'line', from: [3, 2], to: [3, 3] },
    { type: 'line', from: [5, 5], to: [6, 5] },
    { type: 'line', from: [1, 5], to: [2, 5] },
    { type: 'line', from: [2, 5], to: [2, 6] },
    { type: 'line', from: [2, 6], to: [1, 6] },
    { type: 'line', from: [1, 6], to: [1, 5] },
    { type: 'arc',  from: [2, 1], to: [3, 2],
      center: [2, 2], counterclockwise: false },
    { type: 'arc',  from: [3, 3], to: [5, 5],
      center: [5, 3], counterclockwise: true },
  ],

  cars: [
    {
      type: 0,
      startingPoint: [1, 5],
      speed: 1,
      currentPath: null,
      distanceOnPath: null,
      position: null
    }
  ]
}
