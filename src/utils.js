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
