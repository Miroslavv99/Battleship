import { GameBoard } from "./game-board.js";
import { Player } from "./player.js";

export class PlayerManager {
  constructor(botController, gameUiRenderer) {
    this.botController = botController;
    this.gameUiRenderer = gameUiRenderer;
    this.playerOneBoard = new GameBoard();
    this.playerTwoBoard = new GameBoard();
    this.playerOne = new Player(
      null,
      this,
      this.playerOneBoard,
      this.playerTwoBoard
    );
    this.playerTwo = new Player(
      null,
      this,
      this.playerTwoBoard,
      this.playerOneBoard
    );
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
      let attackInfo = this.playerTwo.gameBoard.receiveAttack(cell);
      this.gameUiRenderer.renderBattleInfo(
        attackInfo,
        this.currentPlayer.name,
        `p1-${cell}`
      );
      if (this.isBotMode) {
        this.botMoveSelector(attackInfo);
      } else {
        this.selectPlayer(attackInfo);
      }
    }

    if (
      this.currentPlayer === this.playerOne &&
      owner === "p2" &&
      !this.checkWinner()
    ) {
      let attackInfo = this.playerOne.gameBoard.receiveAttack(cell);
      this.gameUiRenderer.renderBattleInfo(
        attackInfo,
        this.currentPlayer.name,
        `p2-${cell}`
      );

      if (this.isBotMode) {
        this.botMoveSelector(attackInfo);
      } else {
        this.selectPlayer(attackInfo);
      }
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

  // botMoveSelector2(hit, coordinate) {
  //   if (this.isBotMode) {
  //     if (this.currentPlayer === this.playerOne) {
  //       if (!hit) {
  //         this.currentPlayer = this.playerTwo;
  //         this.playerTwo.attack(this.botController.getBotAttackCell());
  //       }
  //     } else {
  //       if (!hit) {
  //         this.currentPlayer = this.playerOne;
  //         this.gameUiRenderer.markCell(`p1-${coordinate}`, "miss");
  //       } else {
  //         this.playerTwo.attack(this.botController.getBotAttackCell());
  //         this.gameUiRenderer.markCell(`p1-${coordinate}`, "hit");
  //       }
  //     }
  //   }
  // }
}
