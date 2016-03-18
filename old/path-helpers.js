import * as PointHelpers from './point-helpers';
import { clone, isEqual } from 'lodash';

// Return a list of paths (copies of the original paths) which start from the
// given point.  All returned paths will be in the correct direction, with
// `from` being the point that was passed in.
export function pathsFromPoint(paths, point) {
  return paths
    .filter((path) => isEqual(path.from, point) || isEqual(path.to, point))
    .map((path) => {
      // Reverse the path if it's going the wrong direction
      if (isEqual(path.to, point)) {
        return reversed(path);
      } else {
        return path;
      }
    });
}

export function length(path) {
  if (path.type === 'line') {
    return PointHelpers.getManhattanDistance(path.from, path.to);
  } else if (path.type === 'arc') {
    console.error('Arcs are not yet implemented.');
    return 0;
  }
}

export function reversed(path) {
  let clonedPath = clone(path);

  [clonedPath.to, clonedPath.from] = [clonedPath.from, clonedPath.to]
  if (clonedPath.type === 'arc') {
    clonedPath.clockwise = !clonedPath.clockwise;
  }

  return clonedPath;
}

// Cardinal direction of the path as it leaves its "from" point
export function outboundDirection(path) {
  if (path.type === 'line') {
    return PointHelpers.getCardinalDirection(path.from, path.to);
  } else if (path.type === 'arc') {
    console.error('Arcs are not yet implemented.');
    return 0;
  }
}

// Cardinal direction of the path as it hits its "to" point, as seen from the
// "to" point
export function inboundDirection(path) {
  return outboundDirection(reversed(path));
}

// TODO(azirbel): This doesn't belong in this file
export function oppositeDirection(cardinalDirection) {
  return (cardinalDirection + 2) % 4;
}
