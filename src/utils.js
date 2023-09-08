export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) {
    gameObj.play(animName);
  }
}

export function isAnyOfTheseKeysDown(k, keys) {
  for (const key of keys) {
    if (k.isKeyDown(key)) return true;
  }

  return false;
}

export function drawTiles(k, map, layer, tileheight, tilewidth) {
  let nbOfDrawnTiles = 0;
  const tilePos = k.vec2(0, 0);
  for (const tile of layer.data) {
    if (nbOfDrawnTiles % layer.width === 0) {
      tilePos.x = 0;
      tilePos.y += tileheight;
    } else {
      tilePos.x += tilewidth;
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

export async function fetchMapData(mapPath) {
  return await (await fetch(mapPath)).json();
}
