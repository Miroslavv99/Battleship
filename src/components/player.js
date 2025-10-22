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
    console.log(this.opponentBoard.ships);

    this.shots.push(coordinate);
    if (this.playerManager.checkWinner()) return;
    this.playerManager.selectPlayer(attackInfo);

    return attackInfo;
  }
}
