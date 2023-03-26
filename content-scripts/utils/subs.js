const byFontSize = 5;
const byPositionPixels = 15;

export function getSubsElement() {
  return document.querySelector('#hp-subtitles');
}

export function increaseSubsSize() {
  const el = getSubsElement();
  const styles = getComputedStyle(el);
  const currentFontSize = +styles.fontSize.slice(0, -2);
  const newFontSize = currentFontSize + byFontSize;
  el.style.fontSize = `${newFontSize}px`;
  el.style.lineHeight = 1;
}

export function decreaseSubsSize() {
  const el = getSubsElement();
  const styles = getComputedStyle(el);
  const currentFontSize = +styles.fontSize.slice(0, -2);
  const newFontSize = currentFontSize - byFontSize;
  el.style.fontSize = `${newFontSize}px`;
  el.style.lineHeight = 1;
}

export function moveSubsUp() {
  const el = getSubsElement();
  const styles = getComputedStyle(el);
  const currentPositionBottom = +styles.bottom.slice(0, -2);
  const newBottomPosition = currentPositionBottom + byPositionPixels;
  el.style.bottom = `${newBottomPosition}px`;
}
export function moveSubsDown() {
  const el = getSubsElement();
  const styles = getComputedStyle(el);
  const currentPositionBottom = +styles.bottom.slice(0, -2);
  const newBottomPosition = currentPositionBottom - byPositionPixels;
  el.style.bottom = `${newBottomPosition}px`;
}
