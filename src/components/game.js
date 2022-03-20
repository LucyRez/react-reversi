import React from "react";
import { RenderBoard } from "./Board/board";
import { makeMove } from "./utility";
import { CheckBoard, iterateCells } from "./checkBoard";
import { Player } from "./player";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.ai = props.ai;
    this.player = new Player();
    this.state = Game.initializeState();
    this.player.triggerMove(this);
  }

  static initializeState() {
    const cells = [];

    for (let i = 0; i < 8; i++) {
      cells[i] = Array(8).fill(null);
    }

    cells[3][3] = -1;
    cells[4][4] = -1;
    cells[3][4] = 1;
    cells[4][3] = 1;

    return {
      boardState: cells,
      turnsCounter: 0,
      continuousPasses: 0,
    };
  }

  isGameFinished() {
    if (this.state.continuousPasses === 2) return true;

    for (let index = 0; index < 8; index++) {
      if (this.state.boardState[index].includes(null)) return false;
    }

    return true;
  }

  getCurrentPlayer() {
    return this.state.turnsCounter % 2 === 0 ? this.player : this.ai;
  }

  getWinner() {
    let white = 0;
    let black = 0;

    for (let index = 0; index < 8; index++) {
      for (let j = 0; j < 8; j++) {
        switch (this.state.boardState[index][j]) {
          case 1:
            ++white;
            break;
          case -1:
            ++black;
            break;
          default:
            break;
        }
      }
    }

    if (white > black) {
      return "Белые";
    }
    if (white === black) {
      return "Tie";
    } else {
      return "Чёрные";
    }
  }

  async pass() {
    return new Promise((resolve) => {
      this.setState((previousState) => {
        return {
          turnsCounter: previousState.turnsCounter + 1,
          continuousPasses: previousState.continuousPasses + 1,
        };
      });

      this.forceUpdate();
      setTimeout(() => resolve(), 2000);
    });
  }

  registerMove(player, move) {
    this.setState((previousState) => {
      return {
        boardState: makeMove(previousState.boardState, player.color, move),
        turnsCounter: previousState.turnsCounter + 1,
        continuousPasses: 0,
      };
    });

    this.forceUpdate();
  }

  async playerMove(move) {
    if (move == null) {
      await this.pass();
    } else {
      this.registerMove(this.player, move);
    }

    if (!this.isGameFinished()) {
      this.ai.triggerMove(this);
    } else {
      this.setState({
        continuousPasses: 0,
        winner: this.getWinner(),
      });
    }
  }

  async aiMove(move) {
    if (move == null) {
      await this.pass();
    } else {
      this.registerMove(this.ai, move);
    }

    if (this.isGameFinished()) {
      this.setState({
        continuousPasses: 0,
        winner: this.getWinner(),
      });
    }
  }

  render() {
    return <RenderBoard game={this} />;
  }
}

export function getAvailableMoves(player, boardState) {
  const availableMoves = [];
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

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (boardState[x][y] === player.color) {
        for (const direction of directions) {
          const handler = new CheckBoard(player.color);
          iterateCells(boardState, { x, y }, direction, handler);
          if (handler.isValidMove()) {
            availableMoves.push(handler.getEndPoint());
          }
        }
      }
    }
  }

  return availableMoves;
}
