import { getAvailableMoves } from "./game";

export class Player {
  constructor() {
    this.color = -1;
  }

  move(move) {
    this.resolvePromise(move);
  }

  triggerMove(game) {
    if (getAvailableMoves(this, game.state.boardState).length === 0) {
      game.playerMove(null);
    }
  }
}
