module.exports = (text, callback) => {
  let textarea = document.createElement('textarea');
  textarea.textContent = text;
  document.body.appendChild(textarea);

  let selection = document.getSelection();
  let range = document.createRange();
  range.selectNode(textarea);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(textarea);

    if (callback) callback();
  } catch (e) {
    console.warn('Copy to clipboard failed.', e);
  }
};
