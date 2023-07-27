# TextCraft

## Description

TextCraft is a Chrome extension that uses OpenAI's GPT-3 model to transform text in a more human-like style and correct grammatical errors. Users can select text while browsing, click on the TextCraft button, and the extension will provide a re-written version of the text.

## Features

- **Text Generation**: Utilizes OpenAI's GPT-3 model to rewrite selected text in a more human-like style, and corrects any grammatical errors.
- **Context Menu**: Provides an option to use TextCraft directly from the context menu (right-click menu).
- **Replace Text**: Replaces the selected text on the webpage with the generated text.
- **Regenerate**: Allows users to regenerate the text if they are not satisfied with the result.

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/textcraft.git`
2. Navigate to `chrome://extensions` in your Chrome browser.
3. Enable "Developer mode" at the top-right.
4. Click on "Load unpacked" and select the `dist` folder of this repository.

## Usage

1. Select some text on a webpage.
2. Click on the TextCraft button that appears near the selected text.
3. In the popup, you will see the generated text.
4. You can click on "Replace" to replace the original text on the webpage with the generated text, or click on "Regenerate" to generate new text.

## Configuration

Users can configure the OpenAI API key and set a custom prompt for the text generation by clicking on the extension icon and selecting "Options". The settings are stored locally in the user's Chrome browser.

## Contribution

If you would like to contribute to this project, feel free to submit a pull request.

## License

This project is licensed under the MIT License.
