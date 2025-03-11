import { convertToTask } from './convert-to-task';

export async function addButtonToNotificationActions() {
    const actionElements = findNotificationActions()
    actionElements.forEach(actionElement => {
        if (actionElement.querySelector('.kintone-task-button')) {
            return;
        }

        // Create our custom button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'sc-jBIHhB bKWYSS__container';

        const button = document.createElement('button');
        button.className = 'sc-jBIHhB bKWYSS sc-jBIHhB bKWYSS__large kintone-task-button';
        button.title = 'Register as Task';
        button.type = 'button';
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent notification from opening

            // Find the parent notification element
            const notificationElement = actionElement.closest('[data-testid="NotificationItem"]');

            // Call the convert to task function
            convertToTask(notificationElement);
        });

        // Create SVG icon for the task button
        const svgHtml = `
      <span class="sc-fLDLck foKAji" role="img" aria-label="Register as Task">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 32 32">
            <path fill="#666666" d="M26 0H6C4.9 0 4 .9 4 2v28c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM14 22.5L9 17.5l2.1-2.1 2.9 2.9 6.9-6.9L23 13.5l-9 9z"/>
          </svg>
        </span>
      </span>
    `;

        button.innerHTML = svgHtml;
        buttonContainer.appendChild(button);

        // Add our button to the action element
        actionElement.appendChild(buttonContainer);
    });
}

function findNotificationActions() {
    return Array.from(document.querySelectorAll('._actions_z5sn9_117'));
}