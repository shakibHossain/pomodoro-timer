export function useNotification() {
  const requestPermission = async () => {
    return await Notification.requestPermission();
  };

  const notify = (title: string, body: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  return { requestPermission, notify };
}
