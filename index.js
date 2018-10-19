export default (text, callback) => {
  const selection = window.getSelection;
  const textNode = document.createTextNode(text);

  document.body.appendChild(textNode);

  try {
    if (document.body.createTextRange) {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(textNode);
      textRange.select();
      document.execCommand('copy');
    } else {
      const range = document.createRange();
      range.selectNodeContents(textNode);
      selection().removeAllRanges();
      selection().addRange(range);
      document.execCommand('copy');
      selection().removeAllRanges();
    }

    textNode.remove();

    if (typeof callback === 'function') callback();
  } catch (e) {
    console.warn('Copy to clipboard failed.', e);
  }
};
