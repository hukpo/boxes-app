import React, { FC } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Text } from '@/ui-kit';
import { shadeColor } from '@/helpers';

type BoxImageProps = {
  uri: string;
  size: number;
  title: string;
  color: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const BoxImage: FC<BoxImageProps> = ({ color, uri, size, title, containerStyle, onPress }) => {
  const onTapEnd = (): void => onPress?.();

  return (
    <GestureDetector gesture={Gesture.Tap().maxDistance(0).onEnd(onTapEnd)}>
      <View style={[styles.container, { height: size, borderRadius: size / 2 }, containerStyle]}>
        {uri ? (
          <Image source={{ uri }} />
        ) : (
          <LinearGradient colors={[shadeColor(color, 70), color]} style={styles.noImageContainer}>
            <Text style={[styles.noImageTitle, { fontSize: size / 2 }]}>{title}</Text>
          </LinearGradient>
        )}
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    overflow: 'hidden',
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageTitle: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
