export default async function world(k) {
  let playerPos;
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
          object.name,
        ]);
      }
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player") {
          playerPos = k.vec2(object.x, object.y);
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

  const player = k.add([
    k.sprite("assets", { anim: "player-side" /* anim: "player-idle" */ }),
    k.scale(4),
    k.area(),
    k.body(),
    k.pos(map.pos.x + playerPos.x, map.pos.y + playerPos.y),
    {
      speed: 500,
    },
  ]);

  player.onCollide("door-entrance", () => k.go(2));

  k.camPos(player.pos);

  k.onKeyDown("left", () => {
    player.flipX = true;
    if (player.curAnim() !== "player-side") {
      player.play("player-side");
    }
    player.move(-player.speed, 0);
    k.camPos(player.pos);
  });
  k.onKeyDown("right", () => {
    player.flipX = false;
    if (player.curAnim() !== "player-side") {
      player.play("player-side");
    }
    player.move(player.speed, 0);
    k.camPos(player.pos);
  });
  k.onKeyDown("up", () => {
    if (player.curAnim() !== "player-up") {
      player.play("player-up");
    }
    player.move(0, -player.speed);
    k.camPos(player.pos);
  });
  k.onKeyDown("down", () => {
    if (player.curAnim() !== "player-down") {
      player.play("player-down");
    }
    player.move(0, player.speed);
    k.camPos(player.pos);
  });
  k.onKeyRelease(() => {
    player.stop();
  });
}
