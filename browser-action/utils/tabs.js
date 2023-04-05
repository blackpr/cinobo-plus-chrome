export function getTab() {
  return chrome.tabs.query({ active: true, currentWindow: true });
}
