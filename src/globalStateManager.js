function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let isSwordEquipped = false;
    let isDialogOn = false;
    const maxHealth = 3;
    let health = maxHealth;
    let nbTalkedOldMan = 0;

    return {
      setPreviousScene: (sceneName) => {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setIsSwordEquipped: (value) => {
        isSwordEquipped = value;
      },
      getIsSwordEquipped: () => isSwordEquipped,
      setIsDialogOn: (value) => {
        isDialogOn = value;
      },
      getIsDialogOn: () => isDialogOn,
      getMaxHealth: () => maxHealth,
      setHealth: (value) => {
        health = value;
      },
      getHealth: () => health,
      setNbTalkedOldMan: (value) => {
        nbTalkedOldMan = value;
      },
      getNbTalkedOldMan: () => nbTalkedOldMan,
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
