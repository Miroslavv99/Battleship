export class BotController {
  constructor() {
    this.cellsArray = this.getCellsArray();
  }

  getBotShips() {
    return ["0,0", "1,0"];
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

  getBotAttackCell() {
    let cells = this.cellsArray;

    let randomIndex = Math.floor(Math.random() * cells.length);

    let coordinate = cells.splice(randomIndex, 1)[0];

    return coordinate;
  }
}
