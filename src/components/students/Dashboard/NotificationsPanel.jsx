import React from "react";
import { Bell, ChevronRight } from "lucide-react";

/**
 * NotificationsPanel Component
 * 
 * Displays user notifications with different styling based on:
 * - Read/unread status
 * - Notification type (info, warning)
 * Allows marking notifications as read
 */
const NotificationsPanel = ({ notifications = [], onMarkAsRead }) => {
  // Get appropriate background color based on notification type and read status
  const getNotificationBgClass = (type, isRead) => {
    if (!isRead) {
      switch(type) {
        case 'warning': return 'bg-red-50 dark:bg-red-900/30';
        case 'info': return 'bg-blue-50 dark:bg-blue-900/30';
        default: return 'bg-blue-50 dark:bg-blue-900/30';
      }
    }
    return 'bg-gray-50 dark:bg-gray-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header with title and view all link */}
      <div className="border-b dark:border-gray-700 p-4 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold flex items-center">
          <Bell size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
          Notifications
        </h3>
        <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          View all <ChevronRight size={16} />
        </a>
      </div>
      
      {/* Content area */}
      <div className="p-3 sm:p-4">
        {notifications.length === 0 ? (
          // Empty state
          <div className="text-center py-6 sm:py-8">
            <Bell size={32} className="sm:hidden mx-auto text-gray-400 mb-2" />
            <Bell size={40} className="hidden sm:block mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications.</p>
          </div>
        ) : (
          // Notifications list
          <div className="space-y-2 sm:space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-2 sm:p-3 rounded-lg ${getNotificationBgClass(notification.type, notification.isRead)}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <p className={`${notification.isRead ? 'font-normal' : 'font-medium'} text-xs sm:text-sm`}>
                    {notification.message}
                  </p>
                  {!notification.isRead && (
                    <button 
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 sm:mt-0"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;