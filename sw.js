import * as constants from './browser-action/constants.js';

function main() {
  // listen for messages from commands
  chrome.commands.onCommand.addListener((command) => {
    if (!constants.SUBS_BUTTON_NAMES.includes(command)) return;

    function sendSubsMessage(tabs) {
      if (!tabs[0].url.startsWith('https://cinobo.com/')) return;

      chrome.tabs.sendMessage(tabs[0].id, {
        command: 'subs-event',
        payload: command,
      });
    }

    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => sendSubsMessage(tabs))
      .catch(reportError);
  });
}

main();
