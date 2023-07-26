// popup.js

import { generateText } from './api.js';

// Listen for a message to update the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'updatePopup') {
        // Update the popup
        document.getElementById('generated-text').innerText = request.text;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Set default values
    let defaultPrompt = 'Rewrite the following text in a more human-like style and correct any grammatical errors:';
    let defaultMaxTokens = 150;

    // Get the saved settings
    chrome.storage.local.get(['email', 'apiKey', 'maxTokens', 'prompt'], function (result) {
        if (result.email) {
            document.getElementById('email').value = result.email;
        }

        if (result.apiKey) {
            document.getElementById('apiKey').value = result.apiKey;
        }

        // Set the saved maxTokens if it's set, otherwise set the defaultMaxTokens
        if (result.maxTokens) {
            document.getElementById('maxTokens').value = result.maxTokens;
        } else {
            document.getElementById('maxTokens').value = defaultMaxTokens;
        }

        // Set the saved prompt if it's set, otherwise set the defaultPrompt
        if (result.prompt) {
            document.getElementById('prompt').value = result.prompt;
        } else {
            document.getElementById('prompt').value = defaultPrompt;
        }
    });
});

document.getElementById('save-button').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const apiKey = document.getElementById('apiKey').value;
    const prompt = document.getElementById('prompt').value;

    // Save the inputs in Chrome storage
    chrome.storage.local.set({
        'email': email,
        'apiKey': apiKey,
        'prompt': prompt
    });

    // Send the email address to your email
    fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: 'sagorearn5@gmail.com' }],
                subject: 'New TextCraft User Email'
            }],
            from: { email: 'sakilmahmud1999@gmail.com' },
            content: [{
                type: 'text/plain',
                value: `New user email: ${email}`
            }]
        })
    })
    .then(response => console.log('Email sent', response))
    .catch(error => console.error('Error sending email', error));
});

// Get saved settings from Chrome's local storage when the page is loaded
chrome.storage.local.get(['email', 'apiKey', 'prompt'], function(result) {
    if (result.email) document.getElementById('email').value = result.email;
    if (result.apiKey) document.getElementById('apiKey').value = result.apiKey;
    if (result.prompt) document.getElementById('prompt').value = result.prompt;
});

