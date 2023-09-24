import { healthBar } from "../uiComponents/healthbar.js";
import {
  generatePlayerComponents,
  setPlayerControls,
  watchPlayerHealth,
} from "../entities/player.js";
import { generateSlimeComponents, setSlimeAI } from "../entities/slime.js";
import { gameState } from "../state/stateManagers.js";
import {
  colorizeBackground,
  drawTiles,
  fetchMapData,
  drawBoundaries,
  onAttacked,
  onCollideWithPlayer,
} from "../utils.js";

export default async function world(k) {
  const previousScene = gameState.getPreviousScene();
  colorizeBackground(k, 76, 170, 255);
  const mapData = await fetchMapData("./assets/maps/world.json");
  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    slimes: [],
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player-dungeon" && previousScene === "dungeon") {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
          continue;
        }

        if (
          object.name === "player" &&
          (!previousScene || previousScene === "house")
        ) {
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
  entities.player.onCollide("dungeon-door-entrance", () => k.go("dungeon"));

  k.camScale(4);
  k.camPos(entities.player.worldPos());
  k.onUpdate(async () => {
    if (entities.player.pos.dist(k.camPos()) > 3) {
      await k.tween(
        k.camPos(),
        entities.player.worldPos(),
        0.15,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }
  });

  for (const slime of entities.slimes) {
    setSlimeAI(k, slime);
    onAttacked(k, slime);
    onCollideWithPlayer(k, slime);
  }

  healthBar(k);
  watchPlayerHealth(k);
}
