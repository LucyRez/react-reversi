class CheckBoard {
  constructor(playerColor) {
    this.color = playerColor;
    this.secondColor = playerColor === 1 ? -1 : 1;
    this.hasOtherPieces = false;
    this.endsEmpty = false;
    this.endPoint = null;
  }

  handleCell(x, y, value) {
    this.endPoint = { x, y };

    if (value === this.secondColor) {
      this.hasOtherPieces = true;
      return true;
    }

    if (value === this.color) {
      return false;
    }

    if (value == null) {
      this.endsEmpty = true;
      return false;
    }
  }

  isValidMove() {
    return this.hasOtherPieces && this.endsEmpty;
  }

  getEndPoint() {
    return this.endPoint;
  }
}

const iterateCells = (cells, start, direction, handler) => {
  for (
    let x = start.x + direction.x, y = start.y + direction.y;
    x >= 0 && x < 8 && y >= 0 && y < 8;
    x += direction.x, y += direction.y
  ) {
    if (!handler.handleCell(x, y, cells[x][y])) {
      break;
    }
  }
};

export { CheckBoard, iterateCells };
