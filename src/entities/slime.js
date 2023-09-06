export function generateSlimeComponents(k, pos) {
  return [
    k.sprite("assets", { frame: 858 }),
    k.area(),
    k.body(),
    k.pos(pos),
    k.offscreen(),
    {},
  ];
}
