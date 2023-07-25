// ui.js

export function replaceText(newText, originalText) {
    let bodyText = document.body.innerText;
    let newBodyText = bodyText.replace(originalText, newText);
    document.body.innerText = newBodyText;
}
