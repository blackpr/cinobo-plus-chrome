async function main() {
  const constantsSrc = browser.runtime.getURL('browser-action/constants.js');
  const constants = await import(constantsSrc);

  // listen for messages from commands
  browser.commands.onCommand.addListener((command) => {
    if (!constants.SUBS_BUTTON_NAMES.includes(command)) return;

    function sendSubsMessage(tabs) {
      if (!tabs[0].url.startsWith('https://cinobo.com/')) return;

      browser.tabs.sendMessage(tabs[0].id, {
        command: 'subs-event',
        payload: command,
      });
    }

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => sendSubsMessage(tabs))
      .catch(reportError);
  });
}

main();
