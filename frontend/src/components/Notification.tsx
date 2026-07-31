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

const TOAST_BG: Record<NotificationType, string> = {
  success: "bg-[#15532f]",
  error: "bg-[#6b1f1f]",
};

function Notification({
  notifications,
  onDismiss,
}: NotificationProps) {
  return (
    <div
      className="fixed top-5 right-5 flex flex-col gap-2.5 z-200 max-[720px]:left-4 max-[720px]:right-4"
      role="status"
      aria-live="polite"
    >
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
    <div
      className={`flex items-center gap-2.5 text-white px-3.5 py-3 rounded-sm min-w-60 max-w-85 shadow-(--shadow-pop) animate-[slideIn_0.18s_ease] max-[720px]:max-w-none ${TOAST_BG[notification.type]}`}
    >
      <span className="font-extrabold">{ICONS[notification.type]}</span>
      <span className="flex-1 text-[0.87rem]">{notification.message}</span>
      <button
        className="bg-transparent border-none text-white/70 text-[1.1rem] leading-none hover:text-white"
        onClick={() => onDismiss(notification.id)}
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  );
}

export default Notification;