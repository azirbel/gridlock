// Mock for how my state object should look.
export default {
  driving: false,
  level: 1,
  levels: {
    1: {
      config: {
        size: [10, 10],
        cars: {
          1: {
            type: 0,
            startPos: [2, 7],
            speed: 1, // units per second
          },
          2: {
            type: 0,
            startPos: [8, 3],
            speed: 1, // units per second
          },
          3: {
            type: 0,
            startPos: [7, 6],
            speed: 1, // units per second
          }
        },
        paths: [
          { id: 1, type: 'line', from: [2, 7], to: [3, 7] },
          { id: 2, type: 'line', from: [3, 7], to: [4, 7] },
          { id: 3, type: 'line', from: [4, 7], to: [4, 6] },
          { id: 4, type: 'line', from: [4, 6], to: [4, 5] },
          { id: 5, type: 'line', from: [4, 5], to: [4, 4] },
          { id: 6, type: 'line', from: [4, 5], to: [5, 5] },
          { id: 7, type: 'line', from: [5, 5], to: [6, 5] },
          { id: 8, type: 'line', from: [6, 5], to: [7, 5] },
          { id: 9, type: 'line', from: [7, 5], to: [8, 5] },
          { id: 10, type: 'line', from: [3, 4], to: [4, 4] },
          { id: 11, type: 'line', from: [4, 4], to: [5, 4] },
          { id: 12, type: 'line', from: [5, 4], to: [6, 4] },
          { id: 13, type: 'line', from: [6, 4], to: [7, 4] },
          { id: 14, type: 'line', from: [7, 4], to: [7, 5] },
          { id: 15, type: 'line', from: [7, 5], to: [7, 6] },
          { id: 16, type: 'line', from: [5, 2], to: [5, 3] },
          { id: 17, type: 'line', from: [5, 3], to: [5, 4] },
          { id: 18, type: 'line', from: [5, 4], to: [5, 5] },
          { id: 19, type: 'line', from: [5, 5], to: [5, 6] },
          { id: 20, type: 'line', from: [5, 3], to: [6, 3] },
          { id: 21, type: 'line', from: [6, 3], to: [7, 3] },
          { id: 22, type: 'line', from: [7, 3], to: [8, 3] },
        ],
        goals: [
          { id: 1, type: 0, pos: [3, 4] },
          { id: 2, type: 0, pos: [5, 6] },
          { id: 3, type: 0, pos: [8, 5] },
        ]
      },

      state: {
        win: false,
        loss: false,
        arrows: [],
        cars: {
          1: {
            crashed: false,
            inGoal: false,
            currentPath: null,
            distanceOnPath: null,
            pos: null
          },
          2: {
            crashed: false,
            inGoal: false,
            currentPath: null,
            distanceOnPath: null,
            pos: null
          },
          3: {
            crashed: false,
            inGoal: false,
            currentPath: null,
            distanceOnPath: null,
            pos: null
          }
        },
      }
    }
  }
}
