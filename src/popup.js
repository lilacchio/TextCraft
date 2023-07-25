// popup.js

import { generateText } from './api.js';

// Listen for a message to update the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'updatePopup') {
        // Update the popup
        document.getElementById('generated-text').innerText = request.text;
    }
});
