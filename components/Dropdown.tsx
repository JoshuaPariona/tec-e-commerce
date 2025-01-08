import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

const DropdownPicker = ({ value, onChange, style }) => {
  return (
    <View style={[style, styles.container]}>
      <View style={styles.picker}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione..."
            color={Colors.light.mutedText}
            value=""
          />
          <Picker.Item label="Comprador" value="user" />
          <Picker.Item label="Vendedor" value="store" />
          <Picker.Item label="Entregas" value="courier" />
        </Picker>
      </View>
      <ThemedText style={styles.label} color={Colors.light.mutedText}>
        Tipo de usuario
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.mutedText,
    borderRadius: 5,
    fontSize: 16,
    color: Colors.light.mutedText,
  },
  label: {
    position: "absolute",
    bottom: "100%",
    marginBottom: -10,
    left: 10,
    backgroundColor: Colors.light.background,
  },
});

export default DropdownPicker;
