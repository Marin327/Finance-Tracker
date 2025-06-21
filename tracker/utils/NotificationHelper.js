import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Не са дадени разрешения за известия!');
    return false;
  }
  return true;
}

export async function scheduleDailyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Напомняне",
      body: "Време е да въведеш разходите си за деня!",
    },
    trigger: { hour: 20, minute: 0, repeats: true },
  });
}
