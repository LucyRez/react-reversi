import { iterateCells } from "./checkBoard";

function clone2dArray(array) {
  const result = Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i].slice();
  }
  return result;
}

export function makeMove(boardState, color, move) {
  const newBoardState = clone2dArray(boardState);
  newBoardState[move.x][move.y] = color;

  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ];

  for (const direction of directions) {
    const animationHandler = new AnimationHandler(color);
    iterateCells(boardState, move, direction, animationHandler);

    if (animationHandler.animate) {
      for (const piece of animationHandler.piecesToAnimate) {
        newBoardState[piece.x][piece.y] = color;
      }
    }
  }

  return newBoardState;
}

class AnimationHandler {
  constructor(myColor) {
    this.myColor = myColor;
    this.otherColor = myColor === 1 ? -1 : 1;
    this.animate = false;
    this.piecesToAnimate = [];
  }

  handleCell(x, y, value) {
    if (value === this.otherColor) {
      this.piecesToAnimate.push({ x, y });
      return true;
    }
    if (value === this.myColor) {
      this.animate = true;
      return false;
    }
    if (value == null) {
      return false;
    }
  }
}
