export default {
  driving: false,
  win: false,
  loss: false,

  paths: [
    { type: 'line', from: [2, 7], to: [3, 7] },
    { type: 'line', from: [3, 7], to: [4, 7] },
    { type: 'line', from: [4, 7], to: [4, 6] },
    { type: 'line', from: [4, 6], to: [4, 5] },
    { type: 'line', from: [4, 5], to: [4, 4] },
    { type: 'line', from: [4, 5], to: [5, 5] },
    { type: 'line', from: [5, 5], to: [6, 5] },
    { type: 'line', from: [6, 5], to: [7, 5] },
    { type: 'line', from: [7, 5], to: [8, 5] },
    { type: 'line', from: [3, 4], to: [4, 4] },
    { type: 'line', from: [4, 4], to: [5, 4] },
    { type: 'line', from: [5, 4], to: [6, 4] },
    { type: 'line', from: [6, 4], to: [7, 4] },
    { type: 'line', from: [7, 4], to: [7, 5] },
    { type: 'line', from: [7, 5], to: [7, 6] },
    { type: 'line', from: [5, 2], to: [5, 3] },
    { type: 'line', from: [5, 3], to: [5, 4] },
    { type: 'line', from: [5, 4], to: [5, 5] },
    { type: 'line', from: [5, 5], to: [5, 6] },
    { type: 'line', from: [5, 3], to: [6, 3] },
    { type: 'line', from: [6, 3], to: [7, 3] },
    { type: 'line', from: [7, 3], to: [8, 3] },
  ],

  cars: [
    {
      type: 0,
      startingPoint: [2, 7],
      speed: 1,
      crashed: false,
      inGoal: false,
      currentPath: null,
      distanceOnPath: null,
      position: null
    },
    {
      type: 0,
      startingPoint: [8, 3],
      speed: 1,
      crashed: false,
      inGoal: false,
      currentPath: null,
      distanceOnPath: null,
      position: null
    },
    {
      type: 0,
      startingPoint: [7, 6],
      speed: 1,
      crashed: false,
      inGoal: false,
      currentPath: null,
      distanceOnPath: null,
      position: null
    }
  ],

  goals: [
    {
      type: 0,
      isOccupied: false, // TODO(azirbel): Remove once collisions are done
      position: [3, 4]
    },
    {
      type: 0,
      isOccupied: false, // TODO(azirbel): Remove once collisions are done
      position: [5, 6]
    },
    {
      type: 0,
      isOccupied: false, // TODO(azirbel): Remove once collisions are done
      position: [8, 5]
    }
  ],

  arrows: []
}
