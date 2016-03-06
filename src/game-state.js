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
      },
      {
        type: 'line',
        from: [1, 5],
        to: [2, 5]
      },
      {
        type: 'line',
        from: [2, 5],
        to: [2, 6]
      },
      {
        type: 'line',
        from: [2, 6],
        to: [1, 6]
      },
      {
        type: 'line',
        from: [1, 6],
        to: [1, 5]
      },
    ]

    this.cars = [
      {
        type: 0,
        startingPoint: [1, 5],
        speed: 1,
        currentPath: null,
        distanceOnPath: null
      }
    ];
  }

  // TODO(azirbel): This should probably be a helpers file, and the config
  // should just be JSON.

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

  // TODO(azirbel): Should definitely be a helper
  pathDistance(path) {
    if (path.type === 'line') {
      return PointHelpers.getManhattanDistance(path.from, path.to);
    } else if (path.type === 'arc') {
      // TODO(azirbel): Implement
      return 0;
    }
  }
}
