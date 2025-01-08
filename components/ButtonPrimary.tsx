import { Colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonPrimary = ({style, color, title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={{ color: color || Colors.light.background }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.tint
  },
});

export default ButtonPrimary;
