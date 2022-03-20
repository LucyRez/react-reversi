import Game from "./game";
import React from "react";
import { AIPlayer, SmartAIPlayer } from "./ai";
import "./Board/board.css";
export default class GameInitializer extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 0,
    };
  }

  clickEasyMode = () => {
    this.setState({
      mode: 0,
    });
    console.log("Easy Mode");
  };

  clickHardMode = () => {
    this.setState({
      mode: 1,
    });
    console.log("Hard Mode");
  };

  render() {
    if (this.state.mode === 0) {
      return (
        <div>
          <Game ai={new AIPlayer()}></Game>
          <button
            className="difficulty-button"
            onClick={() => this.clickEasyMode()}
          >
            Лёгкий режим
          </button>

          <button
            className="difficulty-button"
            onClick={() => this.clickHardMode()}
          >
            Продвинутый режим
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Game ai={new SmartAIPlayer()}></Game>
          <button
            className="difficulty-button"
            onClick={() => this.clickEasyMode()}
          >
            Лёгкий режим
          </button>

          <button
            className="difficulty-button"
            onClick={() => this.clickHardMode()}
          >
            Продвинутый режим
          </button>
        </div>
      );
    }
  }
}
