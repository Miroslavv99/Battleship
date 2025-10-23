import { GameBoard } from "./game-board.js";
import { Player } from "./player.js";

const playerOneBoard = new GameBoard();
const playerTwoBoard = new GameBoard();

export class PlayerManager {
  constructor(botController, gameUiRenderer) {
    this.botController = botController;
    this.gameUiRenderer = gameUiRenderer;
    this.playerOne = new Player(null, this, playerOneBoard, playerTwoBoard);
    this.playerTwo = new Player(null, this, playerTwoBoard, playerOneBoard);
    this.currentPlayer = this.playerOne;
    this.attack = false;
    this.isBotMode = false;
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

  botMoveSelector(hit, coordinate) {
    if (this.isBotMode) {
      if (this.currentPlayer === this.playerOne) {
        if (!hit) {
          this.currentPlayer = this.playerTwo;
          this.playerTwo.attack(this.botController.getBotAttackCell());
        }
      } else {
        if (!hit) {
          this.currentPlayer = this.playerOne;
          this.gameUiRenderer.markCell(`p1-${coordinate}`, "miss");
        } else {
          this.playerTwo.attack(this.botController.getBotAttackCell());
          this.gameUiRenderer.markCell(`p1-${coordinate}`, "hit");
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
}
