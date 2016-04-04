import Immutable from 'immutable'

// Return the direction you would go from `from` to get to `to`.
// 0 is east, 1 is south, etc.
export function getCardinalDirection(from, to) {
  // North or south
  if (from.first() === to.first()) {
    return (to.last() > from.last()) ? 1 : 3;
  // East or west
  } else if (from.last() === to.last()) {
    return (to.first() > from.first()) ? 0 : 2;
  // Not found
  } else {
    return null;
  }
}

// Return the [x, y] vector direction you would go from `from` to get to `to`.
export function getVectorDirection(from, to) {
  switch (getCardinalDirection(from, to)) {
    case 0:
      return [1, 0];
    case 1:
      return [0, 1];
    case 2:
      return [-1, 0];
    case 3:
      return [0, -1];
    default:
      return null;
  }
}

export function getManhattanDistance(from, to) {
  return Math.abs(to.first() - from.first()) +
      Math.abs(to.last() - from.last());
}

export function getEuclideanDistance(from, to) {
  return Math.sqrt(Math.pow(to.first() - from.first(), 2) +
                   Math.pow(to.last() - from.last(), 2));
}

export function scale(point, scale) {
  return point.map((num) => num * scale);
}

export function plus(p1, p2) {
  return Immutable.List.of(p1.first() + p2.first(), p1.last() + p2.last())
}

export function minus(p1, p2) {
  return Immutable.List.of(p1.first() - p2.first(), p1.last() - p2.last())
}

export function dot(p1, p2) {
  return (p1.first() * p2.first()) + (p1.last() * p2.last());
}
