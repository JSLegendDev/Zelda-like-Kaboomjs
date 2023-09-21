import { gameState } from "../state/stateManagers.js";

async function displayLine(textContainer, line) {
  for (const char of line) {
    await new Promise((resolve) =>
      setTimeout(() => {
        textContainer.text += char;
        resolve();
      }, 10)
    );
  }
}

export async function dialog(k, pos, content) {
  gameState.setIsDialogOn(true);

  const dialogBox = k.add([k.rect(800, 200), k.pos(pos), k.fixed()]);
  const textContainer = dialogBox.add([
    k.text("", {
      font: "gameboy",
      width: 700,
      lineSpacing: 15,
      size: 30,
    }),
    k.color(0, 0, 0),
    k.pos(20, 40),
    k.fixed(),
  ]);

  let index = 0;

  await displayLine(textContainer, content[index]);
  let lineFinishedDisplayed = true;
  const dialogKey = k.onKeyPress("space", async () => {
    if (!lineFinishedDisplayed) return;

    index++;
    if (index >= content.length - 1) {
      k.destroy(dialogBox);
      dialogKey.cancel();
      gameState.setIsDialogOn(false);
      return;
    }

    textContainer.text = "";
    lineFinishedDisplayed = false;
    await displayLine(textContainer, content[index]);
    lineFinishedDisplayed = true;
  });
}
