export class GameController {
  constructor(placementManager, playerManager) {
    this.mode = "placement";
    this.placementManager = placementManager;
    this.playerManager = playerManager;
  }

  handlePlacement(cell, owner) {
    const placementDone = this.placementManager.placePlayerShips(cell, owner);
    if (placementDone) this.mode = "attack";
  }

  handleAttack(cell, owner) {
    this.playerManager.attack(cell, owner);
  }
}
