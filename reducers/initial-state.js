import Immutable from 'immutable'

// Mock for how my state object should look.
export default Immutable.fromJS({
  driving: false,
  level: 1,
  levels: {
    1: {
      config: {
        size: [10, 10],
        cars: [
          {
            id: '1',
            type: 0,
            startPos: [2, 7],
            speed: 1, // units per second
          },
          {
            id: '2',
            type: 0,
            startPos: [8, 3],
            speed: 1, // units per second
          },
          {
            id: '3',
            type: 0,
            startPos: [7, 6],
            speed: 1, // units per second
          }
        ],
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
        goals: [
          { type: 0, pos: [3, 4] },
          { type: 0, pos: [5, 6] },
          { type: 0, pos: [8, 5] },
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
            pos: null,
            leader: null
          },
          2: {
            crashed: false,
            inGoal: false,
            pos: null,
            leader: null
          },
          3: {
            crashed: false,
            inGoal: false,
            pos: null,
            leader: null
          }
        },
      }
    }
  }
})
