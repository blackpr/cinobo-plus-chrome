async function main() {
  const casingSrc = chrome.runtime.getURL('content-scripts/utils/casing.js');
  const casing = await import(casingSrc);

  const subsSrc = chrome.runtime.getURL('content-scripts/utils/subs.js');
  const subs = await import(subsSrc);

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  // listen for messages from popup
  chrome.runtime.onMessage.addListener((message) => {
    if (message.command === 'subs-event') {
      const subsElement = subs.getSubsElement();
      if (!subsElement) return;

      const methodName = casing.snakeToCamel(message.payload);
      subs[methodName]();
    }
  });
}

main();
