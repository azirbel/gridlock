import { zip, sum } from 'lodash';

// Return the direction you would go from `from` to get to `to`.
// 0 is east, 1 is south, etc.
export function getCardinalDirection(from, to) {
  // North or south
  if (from[0] === to[0]) {
    return (to[1] > from[1]) ? 1 : 3;
  // East or west
  } else if (from[1] === to[1]) {
    return (to[0] > from[0]) ? 0 : 2;
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
  return Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
}

export function getEuclideanDistance(from, to) {
  return Math.sqrt(Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2));
}

export function plus(point1, point2) {
  return zip(point1, point2).map((points) => sum(points));
}

export function minus(point1, point2) {
  return zip(point1, point2).map((points) => points[0] - points[1]);
}

export function scale(vector, scale) {
  return vector.map((num) => num * scale);
}

export function dot(a, b) {
  return (a[0] * b[0]) + (a[1] * b[1]);
}
