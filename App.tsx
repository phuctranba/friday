import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import getStore, { persistor } from "configs/store.config";
import { requestUserPermission } from "helpers/firebase.helper";
import { requestPermission } from "helpers/permisison.helper";
import { createDB } from "helpers/sqlite.helper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PERMISSIONS } from "react-native-permissions";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "navigation/navigation";


const store = getStore();

const App = () => {
  useEffect(() => {
    createDB().catch((error) => console.log(error, "7nc94nc348"));
    requestPermissionNotification();
    requestUserPermission();
  }, []);

  const requestPermissionNotification = async () => {
    try {
      if (Platform.OS == "android") {
        await requestPermission([
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS
        ]);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
