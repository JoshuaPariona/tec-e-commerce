import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  color?: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, color, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = color? color : useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
