export default async function world(k) {
  console.log(k);
  k.add([
    k.rect(k.canvas.width, k.canvas.height),
    k.color(76, 170, 255),
    k.fixed(),
  ]);
  const mapData = await (await fetch("./assets/maps/world.json")).json();
  const map = k.add([k.pos(0, 0), k.scale(4)]);

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      for (const object of layer.objects) {
        map.add([
          k.rect(object.width, object.height),
          k.pos(object.x, object.y + 16),
          k.area(),
          k.opacity(0),
          k.body({ isStatic: true }),
          k.offscreen(),
        ]);
      }
      continue;
    }

    let nbOfDrawnTiles = 0;
    const tilePos = k.vec2(0, 0);
    for (const tile of layer.data) {
      if (nbOfDrawnTiles % layer.width === 0) {
        tilePos.x = 0;
        tilePos.y += mapData.tileheight;
      } else {
        tilePos.x += mapData.tilewidth;
      }

      nbOfDrawnTiles++;

      if (tile === 0) continue;

      map.add([
        k.sprite("assets", { frame: tile - 1 }),
        k.pos(tilePos),
        k.offscreen(),
      ]);
    }
  }

  const player = k.add([
    k.rect(16, 16),
    k.scale(4),
    k.area(),
    k.body(),
    k.pos(1000, 500),
    { speed: 500 },
  ]);
  player.onUpdate(() => k.camPos(player.pos));
  k.onKeyDown("left", () => player.move(-player.speed, 0));
  k.onKeyDown("right", () => player.move(player.speed, 0));
  k.onKeyDown("up", () => player.move(0, -player.speed));
  k.onKeyDown("down", () => player.move(0, player.speed));
}
