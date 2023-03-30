import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./mainStack";
import { StatusBar } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import RNBootSplash from "react-native-bootsplash";
import { navigationRef } from "helpers/navigation.helper";


function Navigation() {

  const onErrorFromErrorBoundary = useCallback((error: Error, stackTrace: string) => {
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => RNBootSplash.hide({ fade: true })}
    >
      <ErrorBoundary onError={onErrorFromErrorBoundary}>
        <StatusBar backgroundColor={"#00000000"} barStyle={"light-content"} translucent />
        <MainStack />
      </ErrorBoundary>
    </NavigationContainer>
  );
}

export default Navigation;
