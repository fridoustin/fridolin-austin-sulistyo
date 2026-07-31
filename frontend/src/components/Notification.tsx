import { useEffect } from "react";

type NotificationType = "success" | "error";

interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

interface NotificationProps {
  notifications: NotificationItem[];
  onDismiss: (id: number) => void;
}

const ICONS: Record<NotificationType, string> = {
  success: "✓",
  error: "!",
};

function Notification({
  notifications,
  onDismiss,
}: NotificationProps) {
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {notifications.map((notification) => (
        <ToastItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}

interface ToastItemProps {
  notification: NotificationItem;
  onDismiss: (id: number) => void;
}

function ToastItem({
  notification,
  onDismiss,
}: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(
      () => onDismiss(notification.id),
      3200
    );

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div className={`toast toast--${notification.type}`}>
      <span className="toast__icon">
        {ICONS[notification.type]}
      </span>

      <span className="toast__message">
        {notification.message}
      </span>

      <button
        className="toast__close"
        onClick={() => onDismiss(notification.id)}
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  );
}

export default Notification;