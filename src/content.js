// content.js
import { generateText, replaceText } from './api.js';
console.log("Without DOM Executed");

  console.log("Executed");


// Function to open the popup
async function openPopup(selectedText) {
  // Check if the popup is already open
  let popup = document.getElementById('textcraft-popup');
  if (popup) {
    // If it's already open, close it
    document.body.removeChild(popup);
    let overlay = document.getElementById('textcraft-overlay');
    if (overlay) document.body.removeChild(overlay);
  }

  // Create the overlay
  let overlay = document.createElement('div');
  overlay.id = 'textcraft-overlay';
  document.body.appendChild(overlay);

  // Create the popup
  let popupDiv = document.createElement('div');
  popupDiv.id = 'textcraft-popup';
      popupDiv.innerHTML = `
      <div class="card">
        <div class="header">
          <span class="icon">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
            </svg>
          </span>
          <p class="alert">TextCraft</p>
          <button id="close-button">X</button>
        </div>
        <div class="content">
          <div class="original-text">
            <h2>Original Text</h2>
            <div id="selected-text" class="message"></div>
          </div>
          <div class="generated-text">
            <h2>Generated Text</h2>
            <div id="generated-text" class="message"></div>
          </div>
        </div>
        <div class="actions">
          <button id="regenerate-button" class="read">GENERATE</button>
          <button id="copy-button" class="read">COPY</button>
          <button id="replace-button" class="read">REPLACE</button>
        </div>
      </div>
    `; 

      // Add your CSS here
      let style = document.createElement('style');
      style.innerHTML = `
      .card {
          // max-width: 320px;
          border-width: 1px;
          border-color: rgba(219, 234, 254, 1);
          border-radius: 1rem;
          background-color: rgba(255, 255, 255, 1);
          padding: 1rem;
        }
        
        .header {
          display: flex;
          align-items: center;
          grid-gap: 1rem;
          gap: 1rem;
        }
        
        .icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: rgba(96, 165, 250, 1);
          padding: 0.5rem;
          color: rgba(255, 255, 255, 1);
        }
        
        .icon svg {
          height: 1rem;
          width: 1rem;
        }
        
        .alert {
          font-weight: 600;
          color: rgba(107, 114, 128, 1);
        }
        
        .message {
          margin-top: 1rem;
          color: rgba(107, 114, 128, 1);
        }
        
        .actions {
          margin-top: 1.5rem;
        }
        
        .actions a {
          text-decoration: none;
        }
        
        .mark-as-read, .read {
          display: inline-block;
          border-radius: 0.5rem;
          padding: 0.75rem 1.25rem;
          text-align: center;
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 600;
        }
        
        .read {
          background: #6c5ce7;
          color: rgba(255, 255, 255, 1);
          border:none;
          cursor:pointer;
        }
        
        .mark-as-read {
          margin-top: 0.5rem;
          color: rgba(107, 114, 128, 1);
          transition: all .15s ease;
          background: white;
          border: 1px solid #6c5ce7;
          padding: 11px 30px;
          cursor:pointer;
        }
        
        .mark-as-read:hover {
          background-color: rgb(230, 231, 233);
        }
        
        svg {
         width: 3.25em;
         transform-origin: center;
         animation: rotate4 2s linear infinite;
        }
        
        circle {
         fill: none;
         stroke: hsl(214, 97%, 59%);
         stroke-width: 2;
         stroke-dasharray: 1, 200;
         stroke-dashoffset: 0;
         stroke-linecap: round;
         animation: dash4 1.5s ease-in-out infinite;
        }
        
        .download-button {
          position: relative;
          border-width: 0;
          color: white;
          font-size: 15px;
          font-weight: 600;
          border-radius: 4px;
          z-index: 1;
         }
         
         .download-button .docs {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-height: 40px;
          padding: 0 10px;
          border-radius: 4px;
          z-index: 1;
          background-color: #242a35;
          border: solid 1px #e8e8e82d;
          transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
         }
         
         .download-button:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
         }
         
         .download {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 90%;
          margin: 0 auto;
          z-index: -1;
          border-radius: 4px;
          transform: translateY(0%);
          background-color: #01e056;
          border: solid 1px #01e0572d;
          transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
         }
         
         .download-button:hover .download {
          transform: translateY(100%)
         }
         
         .download svg polyline,.download svg line {
          animation: docs 1s infinite;
         }
         
         @keyframes docs {
          0% {
           transform: translateY(0%);
          }
         
          50% {
           transform: translateY(-15%);
          }
         
          100% {
           transform: translateY(0%);
          }
         }

         #textcraft-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
      
        #textcraft-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          width: 80%; /* Adjust the width as per your requirements */
          max-width: 1000px; /* Set a max-width to avoid the card becoming too wide on large screens */
        }
      
        .card {
          font-family: 'Open Sans', sans-serif;
          padding: 2em;
          box-sizing: border-box;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
          background: white;
          border-radius: 8px;
          height: 500px; /* Adjust the height as per your requirements */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      
        #close-button {
          position: absolute;
          right: 10px;
          top: 10px;
          background: none;
          border: none;
          font-size: 1.2em;
          cursor:pointer;
        }
      
        .content {
          display: flex;
          justify-content: space-between;
          gap: 2em;
          flex: 1;
        }
      
        .original-text, .generated-text {
          width: 45%;
          display: flex;
          flex-direction: column;
          gap: 1em;
          height: 100%;
        }
      
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: -5px;
          margin-top:20px;
        }
      
        .message {
          flex: 1;
          border: 1px solid #ccc;
          padding: 1em;
          border-radius: 4px;
          overflow-y: auto;
          font-size: 0.9em;
        }
      `;
      popupDiv.appendChild(style);

      // Update the innerText of the #selected-text div with the selectedText
      popupDiv.querySelector('#selected-text').innerText = selectedText;
      
      document.body.appendChild(popupDiv);

      setTimeout(function() {
        popupDiv.querySelector('#regenerate-button').addEventListener('click', async function () {
          let originalText = document.getElementById('selected-text').innerText;
          let generatedText = await generateText(originalText);
          document.getElementById('generated-text').innerText = generatedText;
        });
    
        popupDiv.querySelector('#replace-button').addEventListener('click', async function () {
          let originalText = document.getElementById('selected-text').innerText;
          let generatedText = await generateText(originalText);
          replaceText(generatedText, originalText);
        });

        popupDiv.querySelector('#copy-button').addEventListener('click', function () {
          let generatedText = document.getElementById('generated-text').innerText;
          navigator.clipboard.writeText(generatedText);
        });
      }, 0);
    }


  function createTextCraftButton() {
      let textCraftButton = document.createElement('button');
      textCraftButton.id = 'textcraft-button';
      textCraftButton.innerText = 'TextCraft';
      textCraftButton.style.position = 'fixed';
      textCraftButton.style.bottom = '10px';
      textCraftButton.style.right = '10px';
      textCraftButton.style.zIndex = '1000';

      document.body.appendChild(textCraftButton);

      textCraftButton.addEventListener('click', function () {
          let selectedText;
          if (document.activeElement.tagName === "TEXTAREA" || document.activeElement.tagName === "INPUT") {
            selectedText = document.activeElement.value.substring(document.activeElement.selectionStart, document.activeElement.selectionEnd);
          } else {
            selectedText = window.getSelection().toString();
          }

          openPopup(selectedText);
      });
  }

  // Function to attach event listeners after the DOM is fully loaded
  function attachEventListeners() {
      // Event delegation for the close button
      document.addEventListener('click', function (event) {
          if (event.target.id === 'close-button') {
              let popupDiv = document.getElementById('textcraft-popup');
              if (popupDiv) {
                  document.body.removeChild(popupDiv);
                  let overlay = document.getElementById('textcraft-overlay');
                  if (overlay) document.body.removeChild(overlay);
              }
          }
      });
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'openPopup') {
        // Call the openPopup function here
        openPopup(request.selectionText);
    }
  });

  // Attach event listeners and create the TextCraft button when the DOM is fully loaded
  attachEventListeners();
  createTextCraftButton();
