// api.js

import axios from 'axios';

// Use the 'text-davinci-003' engine for GPT-3
const openai_api = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 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`
};

export async function generateText(inputText) {
    const prompt = `Rewrite the following text in a more human-like style and correct any grammatical errors: "${inputText}"`;

    const data = {
        'prompt': prompt,
        'max_tokens': 100
    };

    try {
        const response = await axios.post(openai_api, data, { headers: headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(`Error in generating text: ${error}`);
    }
}

// Add the replaceText function and export it
export function replaceText(newText, originalText) {
    let bodyText = document.body.innerText;
    let newBodyText = bodyText.replace(originalText, newText);
    document.body.innerText = newBodyText;
}
