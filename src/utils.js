export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) {
    gameObj.play(animName);
  }
}
