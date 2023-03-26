export function reportExecuteScriptError(error) {
  document.querySelector('#panel').classList.add('hidden');
  document.querySelector('#error-content').classList.remove('hidden');
  console.error(`Failed to execute cinobo+ content script: ${error.message}`);
}

export function reportError(error) {
  console.error(`Could not beastify: ${error}`);
}
