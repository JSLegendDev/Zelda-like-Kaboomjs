function globalStateManager() {
  let previousScene = null;

  return {
    setPreviousScene: (sceneName) => {
      previousScene = sceneName;
    },
    getPreviousScene: () => {
      return previousScene;
    },
  };
}

const gameState = globalStateManager();

export default gameState;
