import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../text';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const Button: FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },
});
