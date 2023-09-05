import k from "./kaboomContext.js";
import endGame from "./scenes/endGame.js";
import gameOver from "./scenes/gameOver.js";
import menu from "./scenes/menu.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";

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
  },
});

const scenes = [menu, world, house, gameOver, endGame];
for (const [index, scene] of scenes.entries()) {
  k.scene(index, () => scene(k));
}

k.go(1);
