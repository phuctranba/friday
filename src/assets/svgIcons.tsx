import React from "react";
import { ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

interface TypedIconProps {
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
  style?: ViewStyle;
}

export const IconClose = ({ size, color = "white" }) => {
  const xml = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
    <g id="icomoon-ignore">
    </g>
    <path fill="${color}" d="M320 274.752l-226.272-226.272-45.248 45.248 226.272 226.272-226.272 226.272 45.248 45.248 226.272-226.272 226.272 226.272 45.248-45.248-226.272-226.272 226.272-226.272-45.248-45.248-226.272 226.272z"></path>
    </svg>
  `;
  return (
    <SvgXml xml={xml} width={size} height={size} />
  );
};
