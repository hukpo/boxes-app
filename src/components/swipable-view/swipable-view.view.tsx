import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import { useTheme } from '@/themes';
import { Icon, Text } from '@/ui-kit';
import { useSwipableRows } from '@/hooks';

type SwipableViewProps = {
  id: string;
  snapWidth: number;
  children: ReactNode;
  onPress: () => void;
  onButtonPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SwipableView: FC<SwipableViewProps> = ({ children, id, style, snapWidth, onPress, onButtonPress }) => {
  const rowsManager = useSwipableRows();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { left, right } = useSafeAreaInsets();

  const position = useSharedValue(0);
  const initialPosition = useSharedValue(0);

  const onTapBegin = (): void => {
    rowsManager.closeAll();
    position.value = withTiming(0);
  };
  const onTapEnd = (): void => {
    if (position.value) {
      position.value = withTiming(0);
    } else {
      onPress();
    }
  };

  const onPanStart = (): void => {
    initialPosition.value = position.value;
  };
  const onPanUpdate = (e: GestureUpdateEvent<PanGestureHandlerEventPayload>): void => {
    const translationX = e.translationX + initialPosition.value;

    if (translationX > 0) {
      position.value = 0;
    } else {
      position.value = translationX;
    }
  };
  const onPanEnd = (): void => {
    if (position.value > -snapWidth) {
      position.value = withTiming(0);
    } else {
      position.value = withTiming(-snapWidth);
      rowsManager.add(id, () => (position.value = withTiming(0)));
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <>
      <GestureDetector
        gesture={Gesture.Race(
          Gesture.Tap().maxDistance(0).onBegin(onTapBegin).onEnd(onTapEnd),
          Gesture.Pan()
            .failOffsetX(0)
            .activeOffsetX([-10, 10])
            .onStart(onPanStart)
            .onUpdate(onPanUpdate)
            .onEnd(onPanEnd),
        )}>
        <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
      </GestureDetector>
      <Pressable
        style={[styles.container, { backgroundColor: colors.red, paddingLeft: left, paddingRight: right }]}
        onPress={onButtonPress}>
        <View style={styles.deleteButton}>
          <Icon name="trash" size={27} color="#fff" />
          <Text style={styles.deleteButtonTitle}>{t('delete')}</Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: -1,
  },
  deleteButton: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonTitle: {
    color: '#fff',
    marginTop: 5,
    fontSize: 13,
    fontWeight: '500',
  },
});
