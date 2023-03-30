import { parsePhoneNumber } from "libphonenumber-js";
import { Dimensions, ImageStyle, Platform, TextStyle, ViewStyle } from "react-native";

const { width, height } = Dimensions.get("window");

const [short, long] = width > height ? [height, width] : [width, height];

export const horizontalScale = (size = 0) => size * short / 375;
export const verticalScale = (size = 0) => size * long / 812;
/**
 * moderateHorizontalScale
 * @param size
 * @param factor
 * Scale by screen horizontal ratio with factor for size compensation. Default factor is 0.5.
 */
export const mhs = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

/**
 * moderateVerticalScale
 * @param size
 * @param factor
 * Scale by screen vertical ratio with factor for size compensation. Default factor is 0.5.
 */
export const mvs = (size, factor = 0.5) => size + (verticalScale(size) - size) * factor;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };


const sleep = async (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const validPhoneNumber = (phoneNumber?: string, countryCode?: string) => {
  if (!phoneNumber || !countryCode) {
    return false;
  }
  try {
    //@ts-ignore
    const phoneNumber1 = parsePhoneNumber(phoneNumber, countryCode);
    if (phoneNumber1.isValid()) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};


export const NAME_CHAT_GPT = Platform.select({
  ios: "ChatAI Bot",
  android: "ChatGPT"
}) || "";
