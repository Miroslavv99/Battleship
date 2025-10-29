export class BotController {
  constructor() {
    this.attackCells = this.getCellsArray();
    this.placementCells = this.getCellsArray();
    this.botShips = [4, 3];
  }

  getCellsArray() {
    const cells = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        cells.push(`${i},${j}`);
      }
    }
    return cells;
  }

  getBotShips() {
    for (let i = 0; i < this.botShips.length; i++) {
      return this.botShips[i];
    }
  }

  getBotPlacementCell() {
    const cells = this.placementCells;

    const randomIndex = Math.floor(Math.random() * cells.length);

    const coordinate = cells.splice(randomIndex, 1)[0];

    return coordinate;
  }

  getBotAttackCell() {
    const cells = this.attackCells;

    const randomIndex = Math.floor(Math.random() * cells.length);

    const coordinate = cells.splice(randomIndex, 1)[0];

    return coordinate;
  }
}
