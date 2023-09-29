export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let freezePlayer = false;
    let locale = "english";
    let fontSize = 30;
    let isGhostDefeated = false;
    let isSonSaved = false;

    return {
      setPreviousScene(sceneName) {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,
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
      setIsSonSaved(value) {
        isSonSaved = value;
      },
      getIsSonSaved: () => isSonSaved,
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
