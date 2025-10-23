import { GameBoard } from "./game-board.js";
import { Player } from "./player.js";

const playerOneBoard = new GameBoard();
const playerTwoBoard = new GameBoard();

export class PlayerManager {
  constructor(renderer) {
    this.gameUiRenderer = renderer;
    this.playerOne = new Player(null, this, playerOneBoard, playerTwoBoard);
    this.playerTwo = new Player(null, this, playerTwoBoard, playerOneBoard);
    this.currentPlayer = this.playerOne;
    this.attack = false;
    this.isBotMode = false;
    this.cellsArray = this.getCellsArray();
  }

  getCellsArray() {
    let cells = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        cells.push(`${i},${j}`);
      }
    }
    return cells;
  }

  botAttack() {
    let cells = this.cellsArray;

    let randomIndex = Math.floor(Math.random() * cells.length);

    let cell = cells.splice(randomIndex, 1)[0];

    this.playerTwo.attack(cell);
    this.gameUiRenderer.markCell(`p1-${cell}`, "miss");
  }

  botMoveSelector(hit) {
    if (this.isBotMode) {
      if (this.currentPlayer === this.playerOne) {
        if (!hit) {
          this.currentPlayer = this.playerTwo;
          this.botAttack();
        }
      } else {
        if (!hit) {
          this.currentPlayer = this.playerOne;
        } else {
          this.botAttack();
        }
      }
    }
  }

  selectPlayer(hit) {
    if (this.currentPlayer === this.playerOne) {
      if (!hit) {
        this.gameUiRenderer.hidePlayerTwoBoard();
        this.currentPlayer = this.playerTwo;
        this.gameUiRenderer.showPlayerOneBoard();
      }
    } else if (this.currentPlayer === this.playerTwo) {
      if (!hit) {
        this.gameUiRenderer.hidePlayerOneBoard();
        this.currentPlayer = this.playerOne;
        this.gameUiRenderer.showPlayerTwoBoard();
      }
    }
  }

  checkWinner() {
    if (this.playerOne.gameBoard.areAllShipsSunk()) {
      this.gameUiRenderer.renderBattleInfo(
        `Player ${this.playerTwo.name} Win!`
      );
      return true;
    } else if (this.playerTwo.gameBoard.areAllShipsSunk()) {
      this.gameUiRenderer.renderBattleInfo(
        `Player ${this.playerOne.name} Win!`
      );
      return true;
    }
  }
}
