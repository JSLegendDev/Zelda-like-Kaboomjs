export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let isDialogOn = false;

    return {
      setPreviousScene: (sceneName) => {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setIsDialogOn: (value) => {
        isDialogOn = value;
      },
      getIsDialogOn: () => isDialogOn,
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
