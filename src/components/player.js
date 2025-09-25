export class Player {
  constructor(name, gameController, gameBoard, opponentBoard) {
    this.name = name;
    this.gameController = gameController;
    this.gameBoard = gameBoard;
    this.opponentBoard = opponentBoard;
    this.shots = [];
  }

  attack(coordinate) {
    if (this.shots.includes(coordinate)) return;

    let attackInfo = this.opponentBoard.receiveAttack(coordinate);
    console.log(this.opponentBoard.ships);

    this.shots.push(coordinate);
    if (this.gameController.checkWinner()) return;
    this.gameController.selectPlayer(attackInfo);
    return attackInfo;
  }
}
