import * as React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION_DASHBOARD } from "constants/naviagtion.constant";
import { NavigatorList } from "./types";
import { FontSizes } from "ui/sizes.ui";
import { RootColor } from "ui/colors.ui";
import DashBoard from "screens/dashboard/dashBoard";

export type NavigationProp = NativeStackNavigationProp<NavigatorList>

const Stack = createNativeStackNavigator<NavigatorList>();

function MainStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: RootColor.Color1
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: FontSizes._24
        },
        animation: "slide_from_right"
      }}
      initialRouteName={NAVIGATION_DASHBOARD}>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name={NAVIGATION_DASHBOARD} component={DashBoard} />
    </Stack.Navigator>
  );
}

export default MainStack;
