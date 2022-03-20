import { getAvailableMoves } from "./game";

export class AIPlayer {
  constructor() {
    this.color = 1;
  }

  triggerMove(game) {
    setTimeout(() => {
      const moves = getAvailableMoves(this, game.state.boardState);
      game.aiMove(
        moves.length === 0
          ? null
          : moves[Math.floor(Math.random() * moves.length)]
      );
    }, 2000);
  }
}
