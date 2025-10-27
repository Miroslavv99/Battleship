export class GameController {
  constructor(placementController, playerManager) {
    this.mode = "placement";
    this.placementController = placementController;
    this.playerManager = playerManager;
  }

  handlePlacement(cell, owner) {
    const placementDone = this.placementController.placePlayerShips(
      cell,
      owner
    );
    if (placementDone) this.mode = "attack";
  }

  handleAttack(cell, owner) {
    this.playerManager.attack(cell, owner);
  }
}
