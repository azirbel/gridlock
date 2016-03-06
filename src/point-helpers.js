import { zip, sum } from 'lodash';

export function getCardinalDirection(from, to) {
  if (from[0] === to[0]) {
    // North or south
    return (to[1] > from[1]) ? 1 : 3;
  } else if (from[1] === to[1]) {
    // East or west
    return (to[0] > from[0]) ? 0 : 2;
  } else {
    return null;
  }
}

export function getPointDirection(from, to) {
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

export function plus(point1, point2) {
  return zip(point1, point2).map((points) => sum(points));
}

export function scale(point, scale) {
  return point.map((num) => num * scale);
}
