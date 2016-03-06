import * as PointHelpers from './point-helpers';
import { clone, isEqual } from 'lodash';

// Return a list of paths (copies of the original paths) which start from the
// given point.  All returned paths will be in the correct direction, with
// `from` being the point that was passed in.
export function pathsFromPoint(paths, point) {
  return paths
    .filter((path) => isEqual(path.from, point) || isEqual(path.to, point))
    .map((path) => {
      let clonedPath = clone(path);

      // Reverse the path if necessary
      if (isEqual(clonedPath.to, point)) {
        clonedPath.to = clonedPath.from;
        clonedPath.from = point;
        if (clonedPath.type === 'arc') {
          clonedPath.clockwise = !clonedPath.clockwise;
        }
      }

      return clonedPath;
    });
}

export function pathLength(path) {
  if (path.type === 'line') {
    return PointHelpers.getManhattanDistance(path.from, path.to);
  } else if (path.type === 'arc') {
    console.error('Arcs are not yet implemented.');
    return 0;
  }
}
