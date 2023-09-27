export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let isDialogOn = false;
    let locale = "english";
    let fontSize = 30;
    let isGhostDefeated = false;

    return {
      setPreviousScene(sceneName) {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setIsDialogOn(value) {
        isDialogOn = value;
      },
      getIsDialogOn: () => isDialogOn,
      setLocale(language) {
        locale = language;
      },
      getLocale: () => locale,
      setFontSize(size) {
        fontSize = size;
      },
      getFontSize: () => fontSize,
      setIsGhostDefeated(value) {
        isGhostDefeated = value;
      },
      getIsGhostDefeated: () => isGhostDefeated,
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}
