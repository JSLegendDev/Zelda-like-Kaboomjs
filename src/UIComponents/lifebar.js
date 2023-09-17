export function lifeBar(k, player) {
  const heartsContainer = k.add([k.pos(20, 20), k.fixed()]);
  heartsContainer.add([k.sprite("full-heart")]);
  heartsContainer.add([k.sprite("full-heart"), k.pos(48, 0)]);
  heartsContainer.add([k.sprite("full-heart"), k.pos(96, 0)]);
}
