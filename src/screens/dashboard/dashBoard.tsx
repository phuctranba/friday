import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootColor } from "ui/colors.ui";

const DashBoard = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{"F.R.I.D.A.Y"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RootColor.Color1,
    alignItems: "center",
    justifyContent: "center"
  },
  txt: {
    color: RootColor.White,
    fontWeight: "bold"
  }
});

export default DashBoard;
