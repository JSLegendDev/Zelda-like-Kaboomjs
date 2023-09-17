export function lifeBar(k, player) {
  player.hurt(1);
  let nbOfFullHearts = 0;
  let addHalfHeart = false;
  if (player.hp() % 2 !== 0) {
    addHalfHeart = true;
  }

  nbOfFullHearts = Math.floor(player.hp() / 2);

  const heartsContainer = k.add([k.pos(20, 20), k.fixed()]);

  let previousX = 0;
  for (let i = 0; i < nbOfFullHearts; i++) {
    heartsContainer.add([k.sprite("full-heart"), k.pos(previousX, 0)]);
    previousX += 48;
  }

  if (addHalfHeart) {
    heartsContainer.add([k.sprite("half-heart"), k.pos(previousX, 0)]);
  }
}
