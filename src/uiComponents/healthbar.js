import { playerState } from "../state/stateManagers.js";

export function healthBar(k) {
  let nbFullHearts = Math.floor(playerState.getHealth());
  let addHalfHeart = false;

  if (playerState.getHealth() - nbFullHearts === 0.5) {
    addHalfHeart = true;
  }

  let nbEmptyHearts =
    playerState.getMaxHealth() - nbFullHearts - (addHalfHeart ? 1 : 0);

  const heartsContainer = k.add([k.pos(20, 20), k.fixed(), "healthContainer"]);

  let previousX = 0;
  for (let i = 0; i < nbFullHearts; i++) {
    heartsContainer.add([k.sprite("full-heart"), k.pos(previousX, 0)]);
    previousX += 48;
  }

  if (addHalfHeart) {
    heartsContainer.add([k.sprite("half-heart"), k.pos(previousX, 0)]);
    previousX += 48;
  }

  if (nbEmptyHearts > 0) {
    for (let i = 0; i < nbEmptyHearts; i++) {
      heartsContainer.add([k.sprite("empty-heart"), k.pos(previousX, 0)]);
      previousX += 48;
    }
  }

  return heartsContainer;
}
