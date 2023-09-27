export default function oldManGlobalStateManager() {
  let instance = null;

  function createInstance() {
    let nbTalkedOldMan = 0;

    return {
      setNbTalkedOldMan(value) {
        nbTalkedOldMan = value;
      },
      getNbTalkedOldMan: () => nbTalkedOldMan,
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
