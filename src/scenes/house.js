import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
} from "../utils.js";

export default async function house(k) {
  colorizeBackground(k, 27, 29, 52);

  const mapData = await fetchMapData("./assets/maps/house.json");
  const map = k.add([k.pos(520, 200)]);

  const entities = {
    player: null,
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      //TODO
      continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tileheight);
  }

  k.camScale(2.5);
}
