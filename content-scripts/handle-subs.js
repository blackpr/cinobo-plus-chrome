async function main() {
  const casingSrc = browser.runtime.getURL('content-scripts/utils/casing.js');
  const casing = await import(casingSrc);

  const subsSrc = browser.runtime.getURL('content-scripts/utils/subs.js');
  const subs = await import(subsSrc);

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'subs-event') {
      const subsElement = subs.getSubsElement();
      if (!subsElement) return;

      const methodName = casing.snakeToCamel(message.payload);
      subs[methodName]();
    }
  });
}

main();
