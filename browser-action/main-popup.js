import { SUBS_BUTTON_NAMES } from './constants.js';
import { reportExecuteScriptError, reportError } from './report-error.js';
import { getTab } from './utils/tabs.js';

function listenForClicks() {
  document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' || !e.target.closest('#panel')) {
      return;
    }

    const element = e.target;
    const name = element.dataset.name;

    if (!SUBS_BUTTON_NAMES.includes(name)) return;

    function sendSubsMessage(tabs, messageType) {
      chrome.tabs.sendMessage(tabs[0].id, {
        command: 'subs-event',
        payload: messageType,
      });
    }

    getTab()
      .then((tabs) => sendSubsMessage(tabs, name))
      .catch(reportError);
  });
}

// When the popup loads, inject a content script into the active tab,
// and add a click handler.
// If we couldn't inject the script, handle the error.
const [tab] = await getTab().catch(reportError);

chrome.scripting
  .executeScript({
    files: ['/content-scripts/handle-subs.js'],
    target: { tabId: tab.id },
  })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
