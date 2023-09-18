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
    k.opacity(),
    {
      speed: 80,
      attackPower: 1,
      direction: "down",
      isAttacking: false,
      isFrozen: false,
    },
    "player",
  ];
}

export function watchPlayerHealth(k) {
  k.onUpdate(() => {
    if (gameState.getHealth() <= 0) {
      gameState.setHealth(gameState.getMaxHealth());
      k.go("gameOver");
    }
  });
}

export function setPlayerControls(k, player) {
  k.onKeyDown("left", () => {
    if (gameState.getIsDialogOn()) return;
    if (isAnyOfTheseKeysDown(k, ["right", "up", "down"])) return;
    player.flipX = true;
    playAnimIfNotPlaying(player, "player-side");
    player.move(-player.speed, 0);
    player.direction = "left";
  });
  k.onKeyDown("right", () => {
    if (gameState.getIsDialogOn()) return;
    if (isAnyOfTheseKeysDown(k, ["left", "up", "down"])) return;
    player.flipX = false;
    playAnimIfNotPlaying(player, "player-side");
    player.move(player.speed, 0);
    player.direction = "right";
  });
  k.onKeyDown("up", () => {
    if (gameState.getIsDialogOn()) return;
    if (isAnyOfTheseKeysDown(k, ["left", "right", "down"])) return;
    playAnimIfNotPlaying(player, "player-up");
    player.move(0, -player.speed);
    player.direction = "up";
  });
  k.onKeyDown("down", () => {
    if (gameState.getIsDialogOn()) return;
    if (isAnyOfTheseKeysDown(k, ["left", "right", "up"])) return;
    playAnimIfNotPlaying(player, "player-down");
    player.move(0, player.speed);
    player.direction = "down";
  });

  k.onKeyPress("space", () => {
    if (gameState.getIsDialogOn()) return;
    if (!gameState.getIsSwordEquipped()) return;
    player.isAttacking = true;

    if (k.get("swordHitBox").length === 0) {
      const swordHitBoxPosX = {
        left: player.worldPos().x - 10,
        right: player.worldPos().x + 10,
        up: player.worldPos().x,
        down: player.worldPos().x,
      };

      const swordHitBoxPosY = {
        left: player.worldPos().y,
        right: player.worldPos().y,
        up: player.worldPos().y - 10,
        down: player.worldPos().y + 10,
      };

      k.add([
        k.area({ shape: new k.Rect(k.vec2(0), 12, 12) }),
        k.pos(
          swordHitBoxPosX[player.direction],
          swordHitBoxPosY[player.direction]
        ),
        "swordHitBox",
      ]);
      k.wait(0.1, () => k.destroyAll("swordHitBox"));
    }

    playAnimIfNotPlaying(player, `player-attack-${player.direction}`);
  });

  k.onKeyRelease("space", () => {
    if (gameState.getIsDialogOn()) return;
    if (!gameState.getIsSwordEquipped()) return;
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
