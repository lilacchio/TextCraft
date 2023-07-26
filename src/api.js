// api.js

import axios from 'axios';

// Default prompt
let defaultPrompt = 'Rewrite the following text in a more human-like style and correct any grammatical errors:';

// Use the 'text-davinci-003' engine for GPT-3
const openai_api = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

export async function generateText(inputText) {
    // Get the saved settings
    let apiKey, maxTokens, customPrompt;
    try {
        ({ apiKey, maxTokens, customPrompt } = await getSettings());
    } catch (error) {
        console.error('Error getting settings:', error);
    }

    // If apiKey is not set, alert the user and return
    if (!apiKey) {
        alert('Please set your OpenAI API key first.');
        return;
    }

    // Set the headers with the API key
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    // Use the custom prompt if it's set, otherwise use the default prompt
    const prompt = customPrompt || defaultPrompt;
    const data = {
        'prompt': `${prompt} "${inputText}"`,
        'max_tokens': maxTokens || 150
    };

    try {
        const response = await axios.post(openai_api, data, { headers: headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(`Error in generating text: ${error}`);
    }
}

// Get the settings from chrome.storage.local
function getSettings() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['apiKey', 'maxTokens', 'prompt'], function(result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });
}

export function replaceText(newText, originalText) {
    // Check if the active element is a textarea or input element or a contenteditable div
    let activeElement = document.activeElement;
    if (activeElement.tagName === "TEXTAREA" || (activeElement.tagName === "INPUT" && activeElement.type === "text") || activeElement.isContentEditable) {
        let selection = window.getSelection();
        if (!selection.rangeCount) return;
        let range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
    } else {
        // Fall back to replacing the text in the entire body
        let bodyText = document.body.innerText;
        let newBodyText = bodyText.replace(originalText, newText);
        document.body.innerText = newBodyText;
    }
}


