import React from 'react';
import { observer } from 'mobx-react-lite';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useVm } from '@/hooks';
import { BoxType } from '../../types';
import { shadeColor } from '@/helpers';
import { Text, Image } from '@/ui-kit';
import { BoxImageVm } from './box-image.vm';

type BoxImageProps = {
  size: number;
  title: string;
  color: string;
  type: BoxType;
  uriKey: string | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const BoxImage = observer<BoxImageProps>(({ color, type, uriKey, size, title, containerStyle, onPress }) => {
  const vm = useVm(BoxImageVm, title, uriKey);

  const onTapEnd = (): void => onPress?.();

  return (
    <GestureDetector gesture={Gesture.Tap().maxDistance(0).onEnd(onTapEnd)}>
      <View
        style={[
          styles.container,
          { height: size, borderRadius: type === BoxType.CHAT ? size / 2 : size / 4 },
          containerStyle,
        ]}>
        {vm.uri ? (
          <Image uri={vm.uri} style={StyleSheet.absoluteFillObject} />
        ) : (
          <LinearGradient colors={[shadeColor(color, 70), color]} style={styles.noImageContainer}>
            <Text style={[styles.noImageTitle, { fontSize: size / 2 }]}>{vm.title}</Text>
          </LinearGradient>
        )}
      </View>
    </GestureDetector>
  );
});

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
