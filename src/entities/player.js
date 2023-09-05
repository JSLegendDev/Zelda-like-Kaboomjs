import k from "../kaboomContext.js";
import { playAnimIfNotPlaying } from "../utils.js";

export function generatePlayerComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "player-idle",
    }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body(),
    k.pos(pos),
    {
      speed: 80,
    },
  ];
}

export function setPlayerControls(k, player) {
  k.onKeyDown("left", () => {
    player.flipX = true;
    playAnimIfNotPlaying(player, "player-side");
    player.move(-player.speed, 0);
  });
  k.onKeyDown("right", () => {
    player.flipX = false;
    playAnimIfNotPlaying(player, "player-side");
    player.move(player.speed, 0);
  });
  k.onKeyDown("up", () => {
    playAnimIfNotPlaying(player, "player-up");
    player.move(0, -player.speed);
  });
  k.onKeyDown("down", () => {
    playAnimIfNotPlaying(player, "player-down");
    player.move(0, player.speed);
  });

  k.onKeyRelease(() => {
    player.stop();
  });
}
