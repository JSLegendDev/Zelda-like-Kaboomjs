import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateSlimeComponents, setSlimeAI } from "../entities/slime.js";
import { drawTiles, fetchMapData } from "../utils.js";

function drawSea(k) {
  k.add([
    k.rect(k.canvas.width, k.canvas.height),
    k.color(76, 170, 255),
    k.fixed(),
  ]);
}

export default async function world(k, previousSceneData = null) {
  drawSea(k);
  const mapData = await fetchMapData("./assets/maps/world.json");
  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    slimes: [],
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
          continue;
        }

        if (object.name === "slime") {
          entities.slimes.push(
            map.add(generateSlimeComponents(k, k.vec2(object.x, object.y)))
          );
        }
      }
      continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
  }

  setPlayerControls(k, entities.player);
  entities.player.onCollide("door-entrance", () => k.go("house"));

  k.camScale(2.5);
  k.camPos(entities.player.worldPos());
  k.onUpdate(() => {
    k.camPos(entities.player.worldPos());
  });

  for (const slime of entities.slimes) {
    setSlimeAI(k, slime);
  }
}
