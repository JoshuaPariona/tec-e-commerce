import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

const BlankScreen = () => {
  return <View style={styles.screen}></View>;
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.background,
  },
});

export default BlankScreen;
