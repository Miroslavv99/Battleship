export class Player {
  constructor(name, playerManager, gameBoard, opponentBoard) {
    this.name = name;
    this.playerManager = playerManager;
    this.gameBoard = gameBoard;
    this.opponentBoard = opponentBoard;
    this.shots = [];
  }

  attack(coordinate) {
    if (this.shots.includes(coordinate)) return;

    let attackInfo = this.opponentBoard.receiveAttack(coordinate);

    this.shots.push(coordinate);
    if (this.playerManager.checkWinner()) return;

    if (this.playerManager.isBotMode) {
      this.playerManager.botMoveSelector(attackInfo, coordinate);
    } else {
      this.playerManager.selectPlayer(attackInfo);
    }

    return attackInfo;
  }
}
