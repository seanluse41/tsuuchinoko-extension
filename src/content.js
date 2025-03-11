// src/content.js

// This script runs in the context of the web page (Kintone/Cybozu)
console.log('Kintone Helper Extension: Content script loaded');

// Helper function to wait for an element to appear in the DOM
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
    
    // Set timeout
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for element: ${selector}`));
    }, timeout);
  });
}

// Initialize when the DOM is fully loaded
function initializeExtension() {
  // Check if we're on a Kintone/Cybozu page
  if (window.location.hostname.includes('kintone.com') || 
      window.location.hostname.includes('cybozu.com')) {
    
    // Example: Add a button to notifications when they appear
    waitForElement('.notification-element-selector')
      .then(notificationElement => {
        // Add your button or other modifications here
        console.log('Found notification element:', notificationElement);
        
        // Example of adding a button (you'll need to adjust selectors/code)
        // addButtonToNotification(notificationElement);
      })
      .catch(error => {
        console.log('Error finding notification element:', error);
      });
  }
}

// Function to add a button to a notification element
function addButtonToNotification(notificationElement) {
  // Your code to create and add a button goes here
  // For example:
  const button = document.createElement('button');
  button.textContent = 'Convert to Task';
  button.className = 'task-convert-button';
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent notification from opening
    
    // Get notification data
    const notificationData = {
      id: notificationElement.dataset.id,
      title: notificationElement.querySelector('.notification-title')?.textContent,
      // Add other data you need
    };
    
    console.log('Converting to task:', notificationData);
    
    // Here you would typically:
    // 1. Send this data to your background script or side panel
    // 2. Or directly make an API call to create a task in Kintone
  });
  
  // Find where to append the button
  const actionArea = notificationElement.querySelector('.notification-actions');
  if (actionArea) {
    actionArea.appendChild(button);
  }
}

// Start the extension
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}