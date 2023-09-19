import gameState from "../globalStateManager.js";
import { dialog } from "../uiComponents/dialog.js";
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

  const responses = [
    [
      "It's dangerous to go alone!",
      "Take this sword, press space to use it.",
      "Please save my son! He's captured in a dungeon towards the west.",
      "I will reward you handsomely!",
    ],
    [
      "You forgot how to use your sword?",
      "Press the space key to attack.",
      "Please now go save my son before it's too late!",
    ],
    ["Please save my son!"],
  ];

  let nbTalkedOldMan = gameState.getNbTalkedOldMan();
  if (nbTalkedOldMan > responses.length - 1) {
    gameState.setNbTalkedOldMan(1);
    nbTalkedOldMan = gameState.getNbTalkedOldMan();
  }

  if (responses[nbTalkedOldMan]) {
    await dialog(k, k.vec2(250, 500), responses[nbTalkedOldMan]);
    gameState.setNbTalkedOldMan(nbTalkedOldMan + 1);
    return;
  }
}

export function endInteraction(k, oldman, player) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
