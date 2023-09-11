function globalStateManager() {
  let instance = null;

  function createInstance() {
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

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}

const gameState = globalStateManager().getInstance();

export default gameState;
