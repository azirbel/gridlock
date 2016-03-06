import * as PointHelpers from './point-helpers';
import { clone, isEqual } from 'lodash';

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
        startingPoint: [1, 1],
        speed: 0.5,
        currentPath: null,
        distanceOnPath: null
      }
    ];
  }

  // Return a list of paths (copies of the original paths)
  // All returned paths will be in the correct direction, with `from` being the
  // point that was passed in.
  pathsAtPoint(point) {
    return this.paths
      .filter((path) => isEqual(path.from, point) || isEqual(path.to, point))
      .map((path) => {
        let clonedPath = clone(path);

        // Reverse the path if necessary
        if (clonedPath.to === point) {
          clonedPath.to = clonedPath.from;
          clonedPath.from = point;
          if (clonedPath.type === 'arc') {
            clonedPath.counterclockwise = !clonedPath.counterclockwise;
          }
        }

        return clonedPath;
      });
  }
}
