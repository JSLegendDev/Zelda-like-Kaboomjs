import k from "./kaboomContext.js";
import endGame from "./scenes/endGame.js";
import gameOver from "./scenes/gameOver.js";
import menu from "./scenes/menu.js";
import world from "./scenes/world.js";

k.loadSprite("assets", "./assets/topdownasset.png", {
  sliceX: 39,
  sliceY: 31,
});

const scenes = [menu, world, gameOver, endGame];
for (const [index, scene] of scenes.entries()) {
  k.scene(index, () => scene(k));
}

k.go(1);
