export default function playerGlobalStateManager() {
  let instance = null;

  function createInstance() {
    let isSwordEquipped = false;
    const maxHealth = 3;
    let health = maxHealth;

    return {
      setIsSwordEquipped: (value) => {
        isSwordEquipped = value;
      },
      getIsSwordEquipped: () => isSwordEquipped,
      getMaxHealth: () => maxHealth,
      setHealth: (value) => {
        health = value;
      },
      getHealth: () => health,
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
