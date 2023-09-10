class GlobalStateManager {
  previousScene = null;

  setPreviousScene(sceneName) {
    this.previousScene = sceneName;
  }

  getPreviousScene() {
    return this.previousScene;
  }
}

const gameState = new GlobalStateManager();

export default gameState;
