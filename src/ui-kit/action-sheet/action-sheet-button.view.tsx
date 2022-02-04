import React, { FC } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableHighlight, ViewStyle } from 'react-native';

import { Text } from '../text';
import { useTheme } from '@/themes';

export type ActionSheetButtonProps = {
  title: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const ActionSheetButton: FC<ActionSheetButtonProps> = ({ title, onPress, containerStyle, titleStyle }) => {
  const { colors } = useTheme();

  return (
    <TouchableHighlight
      style={[styles.container, containerStyle, { backgroundColor: colors.tertiary, borderColor: colors.border }]}
      onPress={onPress}
      underlayColor={colors.highlight}>
      <Text style={[styles.title, titleStyle, { color: colors.primary }]}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
  },
});
