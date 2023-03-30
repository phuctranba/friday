import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";


async function requestUserPermission() {
  await notifee.requestPermission();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

async function getFCMToken() {
  const fcmToken = await AsyncStorage.getItem("whitegFcmToken");
  if (!fcmToken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem("whitegFcmToken", token);
        return token;
      }
      return "";
    } catch (error) {
      console.log("error fcm token", error);
      return "";
    }
  }
  return fcmToken;
}


export { requestUserPermission, getFCMToken };

