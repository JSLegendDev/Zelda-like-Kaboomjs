export function generateGhostComponents(k, pos) {
  return [
    k.sprite("assets", { anim: "ghost-down" }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body(),
    k.pos(pos),
    {},
    "ghost",
  ];
}
