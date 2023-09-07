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
    {
      speed: 50,
      lineOfSight: 30,
    },
  ];
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
