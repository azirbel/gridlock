import * as PathHelpers from './path-helpers';
import * as PointHelpers from './point-helpers';
import {
  chain,
  filter,
  flatten,
  isEqual,
  map,
  maxBy,
  reject,
  uniqBy
} from 'lodash';

export default class GameInteraction {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;

    this.selectedIntersection = null;
    this.selectedMatchingPaths = [];
    this.state = null;

    this.intersections = [];

    // Fixes a problem where double clicking causes text to get selected on the
    // canvas
    canvasElement.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    }, false);

    canvasElement.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    canvasElement.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    canvasElement.addEventListener('mouseup', this.mouseUpHandler.bind(this));
  }

  initialize(state) {
    this.state = state;
    this.intersections = this.getIntersections(state);
  }

  getIntersections(state) {
    let pathEndpoints = chain(state.paths)
      .map((path) => [path.from, path.to])
      .flatten()
      .value();
    let intersections = chain(pathEndpoints)
      .uniqBy((point) => point.toString())
      .filter((endpoint) => {
        return filter(pathEndpoints, (e) => isEqual(endpoint, e)).length >= 3;
      })
      .value();

    return intersections;
  }

  mouseDownHandler(e) {
    if (this.state.driving) return;

    let mousePos = this.getMouse(e);
    let roundedMousePos = mousePos.map((num) => Math.round(num));

    let matchingIntersections = filter(
      this.intersections,
      (intersection) => isEqual(intersection, roundedMousePos));

    if (matchingIntersections.length === 0) return;

    let matchingIntersection = matchingIntersections[0];

    if (PointHelpers.getEuclideanDistance(matchingIntersection, mousePos) > 0.3) return;

    this.selectedIntersection = matchingIntersection;
    this.selectedMatchingPaths = PathHelpers.pathsFromPoint(
        this.state.paths,
        this.selectedIntersection)
  }

  mouseUpHandler(e) {
    if (this.state.driving) return;
    if (!this.selectedIntersection) return;

    let mousePos = this.getMouse(e);
    if (PointHelpers.getEuclideanDistance(this.selectedIntersection, mousePos) < 0.3) {
      // Clear arrows
      this.state.arrows = reject(this.state.arrows, (arrow) => {
        return arrow.from === this.selectedIntersection;
      });
    }

    this.selectedIntersection = null;
    this.selectedMatchingPaths = [];
  }

  mouseMoveHandler(e) {
    if (this.state.driving) return;
    if (!this.selectedIntersection) return;

    let mousePos = this.getMouse(e);
    if (PointHelpers.getEuclideanDistance(this.selectedIntersection, mousePos) < 0.5) return;

    let mouseDirection = PointHelpers.minus(mousePos, this.selectedIntersection);

    let bestMatchingPath = maxBy(this.selectedMatchingPaths, (path) => {
      let pathDirection = PointHelpers.minus(path.to, path.from);
      return PointHelpers.dot(pathDirection, mouseDirection);
    });

    // Update directions
    this.state.arrows = reject(this.state.arrows, (arrow) => {
      return arrow.from === this.selectedIntersection;
    });

    this.state.arrows.push({
      // TODO(azirbel): Maybe just the path?
      from: this.selectedIntersection,
      path: bestMatchingPath
    });
  }

  // TODO(azirbel): This stuff needs to go in canvas.js, since it deals with pixels
  getMouse(e) {
    var rect = this.canvasElement.getBoundingClientRect();
    return this._pxToGrid([
      e.clientX - rect.left,
      e.clientY - rect.top
    ]);
  }

  // Handles both arrays and numbers
  // TODO(azirbel): Very bad to have this here, move it
  // Also, cheated and hardcoded constants
  _pxToGrid(pxThing) {
    if (Array.isArray(pxThing)) {
      return pxThing.map((num) => this._pxToGrid(num));
    } else {
      return pxThing * 10 / 600;
    }
  }
}
