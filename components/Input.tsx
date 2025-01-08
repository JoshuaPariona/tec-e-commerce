import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "./ThemedText";

const Input = ({
  style,
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  const [secureText, setSecureText] = useState(secureTextEntry);

  return (
    <View style={[style, styles.container]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureText}
        placeholderTextColor={Colors.light.mutedText}
      />
      <ThemedText style={styles.label} color={Colors.light.mutedText}>
        {label}
      </ThemedText>
      <TouchableOpacity
        hitSlop={5}
        style={styles.icon}
        onPress={() => setSecureText(!secureText)}
      >
        {secureTextEntry && (
          <Feather
            name={secureText ? "eye-off" : "eye"}
            size={24}
            color={Colors.light.mutedText}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    position: "absolute",
    bottom: "100%",
    marginBottom: -10,
    left: 10,
    backgroundColor: Colors.light.background,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.mutedText,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    left: "90%",
    top: "25%"
  },
});

export default Input;
