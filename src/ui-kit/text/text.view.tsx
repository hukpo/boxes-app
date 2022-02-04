import React, { FC } from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';

type TextProps = {
  style?: StyleProp<TextStyle>;
};

export const Text: FC<TextProps> = ({ children, style }) => {
  return <RNText style={style}>{children}</RNText>;
};
