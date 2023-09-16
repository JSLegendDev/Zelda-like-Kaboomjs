import gameState from "../globalStateManager.js";
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

export function startInteraction(k, oldman, player) {
  gameState.setIsSwordEquipped(true);
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
}

export function endInteraction(k, oldman, player) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
