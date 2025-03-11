// src/content.js
console.log('Kintone Helper Extension: Content script loaded!');

// Helper function to wait for elements to appear in the DOM
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for element: ${selector}`));
    }, timeout);
  });
}

// Function to add task buttons to notifications
function addButtonsToNotifications() {
  console.log('Looking for notification elements...');
  
  // Kintone often uses data-testid attributes
  const notificationItems = document.querySelectorAll('[data-testid="NotificationItem"]');
  console.log(`Found ${notificationItems.length} notification items`);
  
  notificationItems.forEach((item, index) => {
    // Check if we already added our button
    if (item.querySelector('.kintone-task-button')) {
      return;
    }
    
    // Find the actions container
    const actionsContainer = item.querySelector('._actions_z5sn9_117');
    if (!actionsContainer) {
      console.log(`Actions container not found for notification ${index}`);
      return;
    }
    
    // Create our button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'sc-jBIHhB bKWYSS__container';
    
    const button = document.createElement('button');
    button.className = 'sc-jBIHhB bKWYSS sc-jBIHhB bKWYSS__large kintone-task-button';
    button.title = 'Register as Task';
    button.type = 'button';
    
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent notification from opening
      console.log('Task button clicked', item);
      
      // Extract notification data
      const title = item.querySelector('.notification-title')?.textContent || 'New Task';
      const content = item.querySelector('.notification-content')?.textContent || '';
      
      // Send message to the side panel with the notification data
      chrome.runtime.sendMessage({
        type: 'REGISTER_TASK',
        data: { title, content, source: 'notification' }
      });
    });
    
    // SVG icon for the task button
    const svgHtml = `
      <span role="img" aria-label="Register as Task">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 32 32">
            <path fill="#666666" d="M26 0H6C4.9 0 4 .9 4 2v28c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM14 22.5L9 17.5l2.1-2.1 2.9 2.9 6.9-6.9L23 13.5l-9 9z"/>
          </svg>
        </span>
      </span>
    `;
    
    button.innerHTML = svgHtml;
    buttonContainer.appendChild(button);
    actionsContainer.appendChild(buttonContainer);
    console.log(`Added task button to notification ${index}`);
  });
}

// Initialize the extension
function initialize() {
  console.log('Initializing extension on:', window.location.href);
  
  // Check if we're on a notification page
  if (window.location.href.includes('/k/#/ntf/')) {
    console.log('On notification page, setting up...');
    
    // Initial check
    addButtonsToNotifications();
    
    // Set up observer for dynamic content
    const observer = new MutationObserver(() => {
      addButtonsToNotifications();
    });
    
    // Start observing the main container
    waitForElement('.gaia-argoui-notification-list')
      .then(container => {
        observer.observe(container, {
          childList: true,
          subtree: true
        });
        console.log('Observer set up for notifications container');
      })
      .catch(error => {
        console.error('Error finding notifications container:', error);
      });
  }
}

// Start the extension
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Also run on URL changes (for single-page apps)
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    initialize();
  }
}).observe(document, {subtree: true, childList: true});

console.log('Kintone Helper Extension: Setup complete');