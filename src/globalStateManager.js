function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let isSwordEquipped = false;

    return {
      setPreviousScene: (sceneName) => {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setIsSwordEquipped: (value) => {
        isSwordEquipped = value;
      },
      getIsSwordEquipped: () => isSwordEquipped,
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
