import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";

export default async function world(k) {
  k.add([
    k.rect(k.canvas.width, k.canvas.height),
    k.color(76, 170, 255),
    k.fixed(),
  ]);
  const mapData = await (await fetch("./assets/maps/world.json")).json();
  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      for (const object of layer.objects) {
        map.add([
          k.rect(object.width, object.height),
          k.pos(object.x, object.y + 16),
          k.area(),
          k.body({ isStatic: true }),
          k.opacity(0),
          k.offscreen(),
          object.name,
        ]);
      }
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player") {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }
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

  const player = entities.player;
  setPlayerControls(k, player);
  player.onCollide("door-entrance", () => k.go(2));

  k.camScale(4);
  k.camPos(player.worldPos());
  k.onUpdate(() => {
    k.camPos(player.worldPos());
  });
}
