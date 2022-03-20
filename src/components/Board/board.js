import React from "react";
import { Cell } from "../Cell/cell";
import { getAvailableMoves } from "../game";
import "./board.css";

export class RenderBoard extends React.Component {
  render() {
    return (
      <div>
        <Board game={this.props.game} />
      </div>
    );
  }
}

export class Board extends React.Component {
  clickHandler(row, column) {
    const game = this.props.game;

    if (
      game.isGameFinished() ||
      game.getCurrentPlayer() !== game.player ||
      !this.isLegalClick(game, row, column)
    )
      return;

    game.playerMove({ x: row, y: column });

    console.log("Player made a move");
  }

  isLegalClick(game, row, column) {
    for (const legalCell of getAvailableMoves(
      game.player,
      game.state.boardState
    )) {
      if (legalCell.x === row && legalCell.y === column) {
        return true;
      }
    }

    return false;
  }

  getCell(row, column) {
    const game = this.props.game;
    let cellType;

    if (game.getCurrentPlayer() !== game.player) {
      cellType = game.state.boardState[row][column];
    } else {
      let isLegal = false;
      const availableMoves = getAvailableMoves(
        game.player,
        game.state.boardState
      );

      for (const legalCell of availableMoves) {
        if (legalCell.x === row && legalCell.y === column) {
          isLegal = true;
          cellType = 0;
          break;
        }
      }
      if (!isLegal) cellType = game.state.boardState[row][column];
    }

    return (
      <Cell
        cellType={cellType}
        onClick={() => this.clickHandler(row, column)}
        key={`${row}_${column}`}
      />
    );
  }

  getRow(row) {
    const cells = [];

    for (
      let index = 0;
      index < this.props.game.state.boardState[row].length;
      index++
    ) {
      cells.push(this.getCell(row, index));
    }

    return (
      <div className="row" key={row}>
        {cells}
      </div>
    );
  }

  render() {
    const game = this.props.game;
    const gameState = game.state;
    const currentPlayer =
      game.getCurrentPlayer() === game.player ? "Чёрные" : "Белые";

    let winnerText;

    if (gameState.winner) {
      if (gameState.winner === "Tie") {
        winnerText = "Ничья";
      } else {
        winnerText = "Победитель: " + gameState.winner;
      }
    } else {
      if (gameState.continuousPasses !== 0) {
        const playerWhoPassed =
          game.getCurrentPlayer() === game.player ? "Белые" : "Чёрные";
        winnerText = `Игрок ${playerWhoPassed}: Пропуск Хода, Следующий: ${currentPlayer}`;
      } else {
        winnerText = "Следующий ход: " + currentPlayer;
      }
    }

    const rows = [];

    for (let index = 0; index < gameState.boardState.length; index++) {
      rows.push(this.getRow(index));
    }

    return (
      <div className="game">
        <div className="status">"{winnerText}"</div>
        <div className="board">{rows}</div>
      </div>
    );
  }
}
