import k from "./kaboomContext.js";
import endGame from "./scenes/endGame.js";
import gameOver from "./scenes/gameOver.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";
import dungeon from "./scenes/dungeon.js";

k.loadSprite("assets", "./assets/topdownasset.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "player-idle-down": 936,
    "player-down": {
      from: 936,
      to: 939,
      loop: true,
    },
    "player-idle-side": 976,
    "player-side": {
      from: 976,
      to: 978,
      loop: true,
    },
    "player-idle-up": 1014,
    "player-up": {
      from: 1014,
      to: 1017,
      loop: true,
    },
    "slime-idle-down": 858,
    "slime-down": { from: 858, to: 859, loop: true },
    "slime-idle-side": 860,
    "slime-side": { from: 860, to: 861, loop: true },
    "slime-idle-up": 897,
    "slime-up": { from: 897, to: 898, loop: true },
  },
});

const scenes = {
  world,
  house,
  dungeon,
  gameOver,
  endGame,
};
for (const sceneName in scenes) {
  k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("world");
