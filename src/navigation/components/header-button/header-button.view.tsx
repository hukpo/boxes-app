import React, { FC } from 'react';
import { container } from 'tsyringe';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '@/ui-kit';
import { useTheme } from '@/themes';
import { Navigation } from '../../navigation';

type HeaderButtonProps = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
};

export const HeaderButton: FC<HeaderButtonProps> = ({
  title,
  disabled,
  onPress = container.resolve(Navigation).goBack,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress}>
      <Text style={[styles.title, { color: disabled ? colors.textDisabled : colors.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    marginHorizontal: 11,
  },
  title: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
