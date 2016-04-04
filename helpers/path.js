import * as Point from './point';

// Return a list of paths (copies of the original paths) which start from the
// given point.  All returned paths will be in the correct direction, with
// `from` being the point that was passed in.
export function pathsFromPoint(paths, point) {
  return paths
    .filter((path) => {
      return path.get('from').equals(point) || path.get('to').equals(point)
    })
    .map((path) => {
      // Reverse the path if it's going the wrong direction
      if (path.get('to').equals(point)) {
        return reversed(path);
      } else {
        return path;
      }
    });
}

export function length(path) {
  if (path.get('type') === 'line') {
    return Point.getManhattanDistance(path.get('from'), path.get('to'));
  } else if (path.get('type') === 'arc') {
    console.error('Arcs are not yet implemented.');
    return 0;
  }
}

export function reversed(path) {
  let newProps = {
    to: path.get('from'),
    from: path.get('to')
  }

  if (path.get('type') === 'arc') {
    newProps[clockwise] = !path.get('clockwise')
  }

  return path.merge(newProps)
}

// Cardinal direction of the path as it leaves its "from" point
export function outboundDirection(path) {
  if (path.get('type') === 'line') {
    return Point.getCardinalDirection(path.get('from'), path.get('to'));
  } else if (path.get('type') === 'arc') {
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

export function getPointAlongPath(path, distanceOnPath) {
  if (path.get('type') === 'line') {
    return Point.plus(
        path.get('from'),
        Point.scale(toVector(path), distanceOnPath));
  } else if (path.get('type') === 'arc') {
    console.error('Arcs are not yet implemented.');
    return null;
  }
}

export function toVector(path) {
  return Point.minus(path.get('to'), path.get('from'))
}
