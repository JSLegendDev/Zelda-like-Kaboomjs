import { playerState } from "../state/stateManagers.js";
import { healthBar } from "../uiComponents/healthbar.js";
import { blinkEffect } from "../utils.js";
import { playAnimIfNotPlaying } from "../utils.js";

const slimeMovementStates = ["left", "right", "up", "down"];

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
    k.state("idle", ["idle", ...slimeMovementStates]),
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

export function setSlimeAI(k, slime) {
  k.onUpdate(() => {
    switch (slime.state) {
      case "right":
        slime.move(slime.speed, 0);
        break;
      case "left":
        slime.move(-slime.speed, 0);
        break;
      case "up":
        slime.move(0, -slime.speed);
        break;
      case "down":
        slime.move(0, slime.speed);
        break;
      default:
        break;
    }
  });

  slime.onCollide("wall", () => {
    if (slime.state !== "idle") slime.enterState("idle");
  });

  slime.onStateEnter("idle", async () => {
    slime.stop();
    await k.wait(1);
    slime.enterState(
      slimeMovementStates[
        Math.floor(Math.random() * slimeMovementStates.length)
      ]
    );
  });

  function setMovementLoop(k, duration, nextState) {
    let timePassed = 1;
    const movementLoopRef = k.loop(1, () => {
      if (slime.state === "idle") {
        movementLoopRef.cancel();
        return;
      }

      if (timePassed === duration) {
        slime.enterState(nextState);
        movementLoopRef.cancel();
        return;
      }

      timePassed++;
    });
  }

  slime.onStateEnter("right", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-side");

    setMovementLoop(k, 3, "left");
  });

  slime.onStateEnter("left", async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, "slime-side");
    setMovementLoop(k, 3, "right");
  });

  slime.onStateEnter("up", () => {
    playAnimIfNotPlaying(slime, "slime-up");
    setMovementLoop(k, 3, "left");
  });

  slime.onStateEnter("down", () => {
    playAnimIfNotPlaying(slime, "slime-down");
    setMovementLoop(k, 3, "right");
  });
}
