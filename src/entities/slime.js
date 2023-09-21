import { playerState } from "../state/stateManagers.js";
import { healthBar } from "../uiComponents/healthbar.js";
import { blinkEffect } from "../utils.js";
import { playAnimIfNotPlaying } from "../utils.js";

const slimeMovementStates = ["left", "right", "up", "down"];

export function generateSlimeComponents(k, pos) {
  return [
    k.sprite("assets", { frame: 858 }),
    k.area({ shape: new k.Rect(k.vec2(0, 4), 16, 10) }),
    k.body(),
    k.pos(pos),
    k.offscreen(),
    k.timer(),
    k.state("idle", ["idle", ...slimeMovementStates]),
    k.health(3),
    k.opacity(),
    {
      speed: 50,
      lineOfSight: 30,
      attackPower: 0.5,
    },
    "slime",
  ];
}

export function onAttacked(k, slime) {
  slime.onCollide("swordHitBox", async () => {
    if (slime.hp() <= 0) {
      k.destroy(slime);
    }

    await blinkEffect(k, slime);
    slime.hurt(1);
  });
}

export function onCollideWithPlayer(k, slime) {
  slime.onCollide("player", async (player) => {
    if (player.isAttacking) return;
    playerState.setHealth(playerState.getHealth() - slime.attackPower);
    k.destroyAll("healthContainer");
    healthBar(k, player);
    await blinkEffect(k, player);
  });
}

export function setSlimeAI(k, slime) {
  slime.onStateEnter("idle", () => {
    slime.stop();
    slime.wait(2, () => {
      slime.enterState(
        slimeMovementStates[
          Math.floor(Math.random() * slimeMovementStates.length)
        ]
      );
    });
  });
  slime.onStateEnter("left", async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, "slime-side");
    let stop = false;
    const movementUpdate = k.onUpdate(() => {
      if (stop) {
        movementUpdate.cancel();
        return;
      }
      slime.move(-slime.speed, 0);
    });
    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle");
    });
  });
  slime.onStateEnter("right", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-side");
    let stop = false;
    const movementUpdate = k.onUpdate(() => {
      if (stop) {
        movementUpdate.cancel();
        return;
      }
      slime.move(slime.speed, 0);
    });
    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle");
    });
  });
  slime.onStateEnter("up", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-up");
    let stop = false;
    const movementUpdate = k.onUpdate(() => {
      if (stop) {
        movementUpdate.cancel();
        return;
      }
      slime.move(0, -slime.speed);
    });
    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle");
    });
  });
  slime.onStateEnter("down", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-down");
    let stop = false;
    const movementUpdate = k.onUpdate(() => {
      if (stop) {
        movementUpdate.cancel();
        return;
      }
      slime.move(0, slime.speed);
    });
    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle");
    });
  });
}
