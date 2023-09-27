import { playerState, oldManState, gameState } from "../state/stateManagers.js";
import { dialog } from "../uiComponents/dialog.js";
import { playAnimIfNotPlaying } from "../utils.js";
import oldmanLines from "../content/oldmanDialogue.js";

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

  const responses = oldmanLines[gameState.getLocale()];

  playerState.setIsSwordEquipped(true);

  if (gameState.getIsSonSaved()) {
    await dialog(k, k.vec2(250, 500), responses[3]);
    return;
  }

  let nbTalkedOldMan = oldManState.getNbTalkedOldMan();
  if (nbTalkedOldMan > responses.length - 2) {
    oldManState.setNbTalkedOldMan(1);
    nbTalkedOldMan = oldManState.getNbTalkedOldMan();
  }

  if (responses[nbTalkedOldMan]) {
    await dialog(k, k.vec2(250, 500), responses[nbTalkedOldMan]);
    oldManState.setNbTalkedOldMan(nbTalkedOldMan + 1);
    return;
  }
}

export function endInteraction(oldman) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
