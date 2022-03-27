import React, { FC } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableHighlight, ViewStyle } from 'react-native';

import { Text } from '../text';
import { useTheme } from '@/themes';

export type ActionSheetButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'default' | 'destructive';
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const ActionSheetButton: FC<ActionSheetButtonProps> = ({
  type = 'default',
  title,
  onPress,
  containerStyle,
  titleStyle,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableHighlight
      style={[styles.container, containerStyle, { backgroundColor: colors.tertiary, borderColor: colors.border }]}
      onPress={onPress}
      underlayColor={colors.highlight}>
      <Text style={[styles.title, titleStyle, { color: type === 'default' ? colors.primary : colors.red }]}>
        {title}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
  },
});
