import React, { FC } from 'react';
import { BlurView } from 'expo-blur';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@themes';

type BackgroundProps = {
  absoluteFill?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Background: FC<BackgroundProps> = ({ children, style, absoluteFill = true }) => {
  const { dark, colors } = useTheme();

  if (Platform.OS === 'android') {
    return (
      <View style={[absoluteFill && StyleSheet.absoluteFill, { backgroundColor: colors.card }, style]}>{children}</View>
    );
  }

  return (
    <BlurView tint={dark ? 'dark' : 'light'} intensity={100} style={[absoluteFill && StyleSheet.absoluteFill, style]}>
      {children}
    </BlurView>
  );
};
