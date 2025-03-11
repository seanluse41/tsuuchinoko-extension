export async function getNotificationContent(size = 10) {
    try {
      const response = await fetch('/k/api/ntf/list.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          readType: 'UNREAD',
          mentioned: true,
          checkIgnoreMention: true,
          size: size
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success && data.result && Array.isArray(data.result.ntf)) {
        return {
          notifications: data.result.ntf,
          senders: data.result.senders || {}
        };
      } else {
        console.error('Failed to fetch notifications or unexpected data structure:', data);
        return { notifications: [], senders: {} };
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { notifications: [], senders: {} };
    }
  }