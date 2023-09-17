import gameState from "../globalStateManager.js";
import { dialog } from "../UIComponents/dialog.js";
import { playAnimIfNotPlaying } from "../utils.js";

export function generateOldManComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "oldman-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body({ isStatic: true }),
    k.pos(pos),
    {},
    "oldman",
  ];
}

export async function startInteraction(k, oldman, player) {
  if (player.direction === "left") {
    oldman.flipX = true;
    playAnimIfNotPlaying(oldman, "oldman-side");
  }

  if (player.direction === "right") {
    oldman.flipX = false;
    playAnimIfNotPlaying(oldman, "oldman-side");
  }

  if (player.direction === "down") {
    playAnimIfNotPlaying(oldman, "oldman-up");
  }
  gameState.setIsSwordEquipped(true);
  await dialog(k, k.vec2(250, 500), [
    "It's dangerous to go alone!",
    "Take this sword, press space to use it.",
    "Please save my son! He's captured in a dungeon towards the west.",
    "I will reward you handsomely!",
  ]);
}

export function endInteraction(k, oldman, player) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
