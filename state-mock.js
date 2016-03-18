// Mock for how my state object should look.

{
  levels: [
    {
      id: 1,

      config: {
        size: [10, 10],
        cars: [
          {
            id: 1,
            type: 0,
            startingPoint: [2, 7],
            speed: 1, // units per second
          }
        ],
        paths: [
          {
            id: 1,
            type: 'line',
            from: [2, 7],
            to: [3, 7]
          },
          {
            id: 2,
            type: 'line',
            from: [3, 7],
            to: [4, 7]
          },
        ],
        goals: [
          {
            id: 1,
            type: 0,
            position: [3, 4]
          }
        ]
      },

      state: {
        driving: false,
        win: false,
        loss: false,
        arrows: [],

        // All state copied from config
        carsById: {
          1: {
            crashed: false,
            inGoal: false,
            currentPath: null,
            distanceOnPath: null,
            position: null
          }
        },
      }
    }
  ]
}
