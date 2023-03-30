import { Dimensions, Platform, StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { VS } from "ui/sizes.ui";

const { frame } = initialWindowMetrics;

const { width, height } = Dimensions.get("window");
const heightScreen = Dimensions.get("screen").height;

export const Device = {
  ratio: width / heightScreen,
  width,
  height,
  isWeb: Platform.OS === "web",
  isIos: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  isSmallDevice: width < 375,
  heightScreen,
  heightStatusBar: Platform.OS === "ios" ? getStatusBarHeight() : (StatusBar.currentHeight || 0),
  heightPaddingStatusBar: Platform.OS === "ios" ? getStatusBarHeight() * 1.4 : ((StatusBar.currentHeight ?? 0) * 1.4),
  heightSoftMenuBar: heightScreen - frame.height - (Platform.OS === "ios" ? getStatusBarHeight() : (StatusBar.currentHeight || 0)),
  heightSafeWithStatus: frame.height + (Platform.OS === "ios" ? getStatusBarHeight() : (StatusBar.currentHeight || 0)),
  heightBottomTab: VS._44
};
