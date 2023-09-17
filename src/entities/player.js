import gameState from "../globalStateManager.js";
import { isAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../utils.js";

export function generatePlayerComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "player-idle-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body(),
    k.pos(pos),
    k.health(6),
    {
      speed: 80,
      pushPower: 30,
      direction: "down",
      isAttacking: false,
      isFreezed: false,
    },
    "player",
  ];
}

export function setPlayerControls(k, player) {
  k.onKeyDown("left", () => {
    if (isAnyOfTheseKeysDown(k, ["right", "up", "down"]) || player.isFreezed)
      return;
    player.flipX = true;
    playAnimIfNotPlaying(player, "player-side");
    player.move(-player.speed, 0);
    player.direction = "left";
  });
  k.onKeyDown("right", () => {
    if (isAnyOfTheseKeysDown(k, ["left", "up", "down"]) || player.isFreezed)
      return;
    player.flipX = false;
    playAnimIfNotPlaying(player, "player-side");
    player.move(player.speed, 0);
    player.direction = "right";
  });
  k.onKeyDown("up", () => {
    if (isAnyOfTheseKeysDown(k, ["left", "right", "down"]) || player.isFreezed)
      return;
    playAnimIfNotPlaying(player, "player-up");
    player.move(0, -player.speed);
    player.direction = "up";
  });
  k.onKeyDown("down", () => {
    if (isAnyOfTheseKeysDown(k, ["left", "right", "up"]) || player.isFreezed)
      return;
    playAnimIfNotPlaying(player, "player-down");
    player.move(0, player.speed);
    player.direction = "down";
  });

  k.onKeyPress("space", () => {
    if (!gameState.getIsSwordEquipped() || player.isFreezed) return;
    player.isAttacking = true;
    playAnimIfNotPlaying(player, `player-attack-${player.direction}`);
  });

  k.onKeyRelease("space", () => {
    if (!gameState.getIsSwordEquipped() || player.isFreezed) return;
    if (player.direction === "left" || player.direction === "right") {
      playAnimIfNotPlaying(player, "player-side");
      return;
    }
    playAnimIfNotPlaying(player, `player-${player.direction}`);
    player.isAttacking = false;
  });

  k.onKeyRelease(() => {
    player.stop();
  });
}
