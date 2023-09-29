import {
  colorizeBackground,
  drawTiles,
  fetchMapData,
  drawBoundaries,
  onAttacked,
  onCollideWithPlayer,
} from "../utils.js";

import {
  generatePlayerComponents,
  setPlayerControls,
  watchPlayerHealth,
} from "../entities/player.js";
import { gameState, playerState } from "../state/stateManagers.js";
import { healthBar } from "../uiComponents/healthbar.js";
import { dialog } from "../uiComponents/dialog.js";
import sonLines from "../content/sonDialogue.js";
import {
  generateGhostComponents,
  onGhostDestroyed,
  setGhostAI,
} from "../entities/ghost.js";

export default async function dungeon(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("./assets/maps/dungeon.json");
  const map = k.add([k.pos(420, 95)]);

  const entities = {
    player: null,
    ghost: null,
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
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

        if (object.name === "ghost" && !gameState.getIsGhostDefeated()) {
          entities.ghost = map.add(
            generateGhostComponents(k, k.vec2(object.x, object.y))
          );
          continue;
        }

        if (object.name === "prison-door") {
          map.add([
            k.sprite("assets", { frame: playerState.getHasKey() ? 506 : 505 }),
            !playerState.getHasKey() && k.area(),
            !playerState.getHasKey() && k.body({ isStatic: true }),
            k.pos(object.x, object.y),
            "prison-door",
          ]);
          continue;
        }

        if (object.name === "boulder") {
          map.add([
            k.sprite("assets", { frame: 392 }),
            k.area(),
            k.body({ isStatic: true }),
            k.pos(object.x, object.y),
            "boulder",
          ]);
        }
      }
      continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
  }

  setPlayerControls(k, entities.player);
  entities.player.onCollide("door-exit", () => {
    gameState.setPreviousScene("dungeon");
    k.go("world");
  });

  async function slideCamY(k, range, duration) {
    const currentCamPos = k.camPos();
    await k.tween(
      currentCamPos.y,
      currentCamPos.y + range,
      duration,
      (newPosY) => k.camPos(currentCamPos.x, newPosY),
      k.easings.linear
    );
  }

  entities.player.onCollide("door-entrance", async () => {
    gameState.setFreezePlayer(true);
    await slideCamY(k, -180, 1);
    entities.player.pos.y -= 50;
    gameState.setFreezePlayer(false);
  });

  entities.player.onCollide("door-exit-2", async () => {
    gameState.setFreezePlayer(true);
    await slideCamY(k, 180, 1);
    entities.player.pos.y += 50;
    gameState.setFreezePlayer(false);
  });

  entities.player.onCollide("prison-door", async (prisonDoor) => {
    await dialog(
      k,
      k.vec2(250, 500),
      sonLines[gameState.getLocale()][playerState.getHasKey() ? 1 : 0]
    );

    if (playerState.getHasKey()) {
      prisonDoor.frame = 506;
      prisonDoor.unuse("body");
      prisonDoor.unuse("area");
    }

    gameState.setIsSonSaved(true);
  });

  entities.player.onCollide("son", async () => {
    await dialog(k, k.vec2(250, 500), sonLines[gameState.getLocale()][2]);
  });

  if (entities.ghost !== null) {
    setGhostAI(k, entities.ghost, entities.player);
    onAttacked(k, entities.ghost);
    onCollideWithPlayer(k, entities.ghost);
    onGhostDestroyed(k);
  }

  k.camScale(4);
  healthBar(k);
  watchPlayerHealth(k);
}
