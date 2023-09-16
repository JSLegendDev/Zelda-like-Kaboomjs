function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let isSwordUnlocked = false;

    return {
      setPreviousScene: (sceneName) => {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setIsSwordUnlocked: (value) => {
        isSwordUnlocked = value;
      },
      getIsSwordUnlocked: () => isSwordUnlocked,
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
