import { GameBoard } from "./game-board.js";
import { Player } from "./player.js";

const playerOneBoard = new GameBoard();
const playerTwoBoard = new GameBoard();

export class GameController {
  constructor(renderer) {
    this.renderer = renderer;
    this.playerOne = new Player(null, this, playerOneBoard, playerTwoBoard);
    this.playerTwo = new Player(null, this, playerTwoBoard, playerOneBoard);
    this.currentPlayer = this.playerOne;
    this.attack = false;
  }

  selectPlayer(hit) {
    if (this.currentPlayer === this.playerOne) {
      if (!hit) {
        this.renderer.hidePlayerTwoBoard();
        this.currentPlayer = this.playerTwo;
        this.renderer.showPlayerOneBoard();
      }
    } else if (this.currentPlayer === this.playerTwo) {
      if (!hit) {
        this.renderer.hidePlayerOneBoard();
        this.currentPlayer = this.playerOne;
        this.renderer.showPlayerTwoBoard();
      }
    }
  }

  checkWinner() {
    if (this.playerOne.gameBoard.areAllShipsSunk()) {
      this.renderer.renderBattleInfo(`Player ${this.playerTwo.name} Win!`);
      return true;
    } else if (this.playerTwo.gameBoard.areAllShipsSunk()) {
      this.renderer.renderBattleInfo(`Player ${this.playerOne.name} Win!`);
      return true;
    }
  }
}
