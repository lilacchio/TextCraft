// background.js

// Listen for a right click
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // Check the menuItemId to see which item was clicked
  if (info.menuItemId === 'textcraft') {
    // Send a message to the content script to open the popup with the selected text
    chrome.tabs.sendMessage(tab.id, { message: 'openPopup', selectionText: info.selectionText });
  }
});

// Create a context menu item
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'textcraft',
    title: 'TextCraft',
    contexts: ['selection']
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'getSelectedText') {
    // Get the selected text from the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "openPopup", selectionText: request.selectionText});
    });
  }
});
