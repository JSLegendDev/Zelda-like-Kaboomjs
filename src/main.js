import k from "./kaboomContext.js";
import mainMenu from "./scenes/mainMenu.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";
import dungeon from "./scenes/dungeon.js";

k.loadFont("gameboy", "assets/gb.ttf");
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
    "player-attack-up": 1094,
    "player-attack-down": 1092,
    "player-attack-left": 1093,
    "player-attack-right": 1093,
    "slime-idle-down": 858,
    "slime-down": { from: 858, to: 859, loop: true },
    "slime-idle-side": 860,
    "slime-side": { from: 860, to: 861, loop: true },
    "slime-idle-up": 897,
    "slime-up": { from: 897, to: 898, loop: true },
    "oldman-down": 866,
    "oldman-side": 907,
    "oldman-up": 905,
    "ghost-down": { from: 862, to: 863, loop: true },
  },
});
k.loadSpriteAtlas("./assets/topdownasset.png", {
  "full-heart": {
    x: 0,
    y: 224,
    width: 48,
    height: 48,
  },
  "half-heart": {
    x: 48,
    y: 224,
    width: 48,
    height: 48,
  },
  "empty-heart": {
    x: 96,
    y: 224,
    width: 48,
    height: 48,
  },
});

const scenes = {
  world,
  house,
  dungeon,
  mainMenu,
};
for (const sceneName in scenes) {
  k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("mainMenu");
