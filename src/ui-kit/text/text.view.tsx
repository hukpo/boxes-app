import React, { FC } from 'react';
import { ColorValue, StyleProp, StyleSheet, Text as RNText, TextStyle } from 'react-native';

import { useValue } from '@/hooks';

type TextProps = {
  onPress?: () => void;
  highlightColor?: ColorValue;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export const Text: FC<TextProps> = ({ children, numberOfLines, onPress, highlightColor, style }) => {
  const highlightActive = useValue(false);

  return (
    <RNText
      numberOfLines={numberOfLines}
      suppressHighlighting={true}
      onPressIn={onPress && highlightActive.toggle}
      onPressOut={onPress && highlightActive.toggle}
      onPress={onPress}
      style={[
        styles.text,
        style,
        !!highlightColor && (onPress ? highlightActive() : true) && { backgroundColor: highlightColor },
      ]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    borderRadius: 3,
    overflow: 'hidden',
  },
});
