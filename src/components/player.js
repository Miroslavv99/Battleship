export class Player {
  #shots = [];
  constructor(name, playerManager, gameBoard, opponentBoard) {
    this.playerManager = playerManager;
    this.opponentBoard = opponentBoard;
    this.name = name;
    this.gameBoard = gameBoard;
  }

  attack(coordinate) {
    if (this.#shots.includes(coordinate)) return;

    let attackInfo = this.opponentBoard.receiveAttack(coordinate);

    this.#shots.push(coordinate);
    if (this.playerManager.checkWinner()) return;

    if (this.playerManager.isBotMode) {
      this.playerManager.botMoveSelector(attackInfo, coordinate);
    } else {
      this.playerManager.selectPlayer(attackInfo);
    }

    return attackInfo;
  }
}
