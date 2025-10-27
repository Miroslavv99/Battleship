import { GameBoard } from "../core/game-board.js";
import { Player } from "../core/player.js";

export class PlayerManager {
  constructor(botController, gameUiRenderer) {
    this.botController = botController;
    this.gameUiRenderer = gameUiRenderer;
    this.playerOneBoard = new GameBoard();
    this.playerTwoBoard = new GameBoard();
    this.playerOne = new Player(null, this.playerOneBoard);
    this.playerTwo = new Player(null, this.playerTwoBoard);
    this.currentPlayer = this.playerOne;
    this.isBotMode = false;
  }

  checkWinner() {
    if (this.playerOne.gameBoard.areAllShipsSunk()) {
      return true;
    } else if (this.playerTwo.gameBoard.areAllShipsSunk()) {
      return true;
    }
  }

  attack(cell, owner) {
    if (
      this.currentPlayer === this.playerTwo &&
      owner === "p1" &&
      !this.checkWinner()
    ) {
      if (this.playerOne.shots.includes(cell)) return;
      let attackInfo = this.playerOne.gameBoard.receiveAttack(cell);
      this.playerOne.shots.push(cell);
      if (this.isBotMode) {
        this.botMoveSelector(attackInfo);
      } else {
        this.selectPlayer(attackInfo);
      }
      this.gameUiRenderer.renderBattleInfo(
        attackInfo,
        this.currentPlayer.name,
        `p1-${cell}`,
        this.checkWinner()
      );
    }

    if (
      this.currentPlayer === this.playerOne &&
      owner === "p2" &&
      !this.checkWinner()
    ) {
      if (this.playerTwo.shots.includes(cell)) return;
      let attackInfo = this.playerTwo.gameBoard.receiveAttack(cell);
      this.playerTwo.shots.push(cell);
      if (this.isBotMode) {
        this.botMoveSelector(attackInfo);
      } else {
        this.selectPlayer(attackInfo);
      }
      this.gameUiRenderer.renderBattleInfo(
        attackInfo,
        this.currentPlayer.name,
        `p2-${cell}`,
        this.checkWinner()
      );
    }
  }

  botMoveSelector(hit) {
    if (this.currentPlayer === this.playerOne) {
      if (!hit) {
        this.currentPlayer = this.playerTwo;
        let botAttackCell = this.botController.getBotAttackCell();
        let botHit = this.playerTwo.gameBoard.receiveAttack(botAttackCell);
        this.gameUiRenderer.renderBattleInfo(
          botHit,
          this.currentPlayer.name,
          `p1-${botAttackCell}`
        );
        if (botHit) {
          while (botHit === true) {
            let botAttackCell = this.botController.getBotAttackCell();
            botHit = this.playerTwo.gameBoard.receiveAttack(botAttackCell);
            this.gameUiRenderer.renderBattleInfo(
              botHit,
              this.currentPlayer.name,
              `p1-${botAttackCell}`
            );
            this.currentPlayer = this.playerOne;
          }
        } else if (this.currentPlayer === this.playerTwo) {
          this.currentPlayer = this.playerOne;
        }
      }
    }
  }

  selectPlayer(hit) {
    if (this.currentPlayer === this.playerOne) {
      if (!hit) {
        this.currentPlayer = this.playerTwo;
        this.gameUiRenderer.togglePlayerTwoBoard();
        this.gameUiRenderer.togglePlayerOneBoard();
      }
    } else if (this.currentPlayer === this.playerTwo) {
      if (!hit) {
        this.currentPlayer = this.playerOne;
        this.gameUiRenderer.togglePlayerOneBoard();
        this.gameUiRenderer.togglePlayerTwoBoard();
      }
    }
  }
}
