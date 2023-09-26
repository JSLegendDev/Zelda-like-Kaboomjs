import { playerState } from "../state/stateManagers.js";
import { healthBar } from "../uiComponents/healthbar.js";
import { blinkEffect } from "../utils.js";
import { playAnimIfNotPlaying } from "../utils.js";

const directionalStates = ["left", "right", "up", "down"];
export function generateSlimeComponents(k, pos) {
  return [
    k.sprite("assets", { frame: 858 }),
    k.area({
      shape: new k.Rect(k.vec2(0, 4), 16, 10),
      collisionIgnore: ["slime"],
    }),
    k.body(),
    k.pos(pos),
    k.offscreen(),
    k.timer(),
    k.state("idle", ["idle", ...directionalStates]),
    k.health(3),
    k.opacity(),
    {
      speed: 100,
      lineOfSight: 30,
      attackPower: 0.5,
    },
    "slime",
  ];
}

async function move(k, entity, isHorizontal, moveBy, duration) {
  await entity.tween(
    isHorizontal ? entity.pos.x : entity.pos.y,
    isHorizontal ? entity.pos.x + moveBy : entity.pos.y + moveBy,
    duration,
    (val) => {
      isHorizontal ? (entity.pos.x = val) : (entity.pos.y = val);
    },
    k.easings.linear
  );
}

export function setSlimeAI(k, slime) {
  k.onSceneLeave(() => {
    idle.cancel();
    right.cancel();
    up.cancel();
    down.cancel();
  });

  const idle = slime.onStateEnter("idle", () => {
    slime.stop();
    slime.enterState(
      directionalStates[Math.floor(Math.random() * directionalStates.length)]
    );
  });

  const right = slime.onStateEnter("right", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-side");
    await move(k, slime, true, 20, 1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("left");
      return;
    }

    slime.enterState("right");
  });

  const left = slime.onStateEnter("left", async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, "slime-side");
    await move(k, slime, true, -20, 1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("right");
      return;
    }

    slime.enterState("idle");
  });

  const up = slime.onStateEnter("up", async () => {
    playAnimIfNotPlaying(slime, "slime-up");
    await move(k, slime, false, -20, 1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("down");
      return;
    }

    slime.enterState("idle");
  });

  const down = slime.onStateEnter("down", async () => {
    playAnimIfNotPlaying(slime, "slime-down");
    await move(k, slime, false, 20, 1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("up");
      return;
    }

    slime.enterState("idle");
  });
}
