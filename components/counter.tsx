import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export default function Counter({style, onChange}) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    onChange(count);
  }, [count])

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity hitSlop={5} style={styles.button} onPress={decrement}>
        <ThemedText type="title">-</ThemedText>
      </TouchableOpacity>
      <ThemedText
        type="subtitle"
        color={Colors.light.mutedText}
      >
        {count}
      </ThemedText>
      <TouchableOpacity hitSlop={5} style={styles.button} onPress={increment}>
        <ThemedText type="title">+</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
    backgroundColor: Colors.light.background,
    borderRadius: 10
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 10
  }
});
