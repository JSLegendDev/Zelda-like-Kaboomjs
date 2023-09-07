import { playAnimIfNotPlaying } from "../utils.js";

export function generateSlimeComponents(k, pos) {
  return [
    k.sprite("assets", { frame: 858 }),
    k.area(),
    k.body(),
    k.pos(pos),
    k.offscreen(),
    k.timer(),
    k.state("idle", ["idle", "left", "right", "up", "down", "follow"]),
    {
      speed: 50,
    },
  ];
}

export function setSlimeAI(k, slime) {
  slime.onStateEnter("idle", (previousState) => {
    slime.stop();
    slime.wait(2, () => {
      if (previousState === "left") {
        slime.enterState("right");
        return;
      }

      if (previousState === "up") {
        slime.enterState("down");
        return;
      }

      if (previousState === "right") {
        slime.enterState("up");
        return;
      }

      slime.enterState("left");
    });
  });

  slime.onStateEnter("left", async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, "slime-side");

    let stop = false;
    const movementUdate = k.onUpdate(() => {
      if (stop) {
        movementUdate.cancel();
        return;
      }

      slime.move(-slime.speed, 0);
    });

    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle", "left");
    });
  });

  slime.onStateEnter("right", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-side");

    let stop = false;
    const movementUdate = k.onUpdate(() => {
      if (stop) {
        movementUdate.cancel();
        return;
      }

      slime.move(slime.speed, 0);
    });

    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle", "right");
    });
  });

  slime.onStateEnter("up", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-up");

    let stop = false;
    const movementUdate = k.onUpdate(() => {
      if (stop) {
        movementUdate.cancel();
        return;
      }

      slime.move(0, -slime.speed);
    });

    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle", "up");
    });
  });

  slime.onStateEnter("down", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-down");

    let stop = false;
    const movementUdate = k.onUpdate(() => {
      if (stop) {
        movementUdate.cancel();
        return;
      }

      slime.move(0, slime.speed);
    });

    slime.wait(3, () => {
      stop = true;
      slime.enterState("idle", "down");
    });
  });
}
