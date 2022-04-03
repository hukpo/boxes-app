import { Portal } from '@gorhom/portal';
import { useTranslation } from 'react-i18next';
import { FullWindowOverlay } from 'react-native-screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Keyboard, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {
  FC,
  useMemo,
  Children,
  ReactNode,
  forwardRef,
  cloneElement,
  ReactElement,
  useImperativeHandle,
} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import { useTheme } from '@/themes';
import { ActionSheetButton, ActionSheetButtonProps } from './action-sheet-button.view';

const DEFAULT_PADDING = 10;
const MAX_CONTAINER_OPACITY = 0.5;
const SWIPE_UP_DELAY_COEFFICIENT = 15;
const MIN_VELOCITY_Y_TO_CLOSE_ACTION_SHEET = 100;

export type ActionSheetRef = {
  open: () => void;
};

type ActionSheetContainerProps = {
  portal?: boolean;
  children: ReactNode;
};

const ActionSheetContainerParent: FC<ActionSheetContainerProps> = ({ portal, children }) => {
  if (!portal) {
    return <>{children}</>;
  }

  return (
    <Portal>
      <FullWindowOverlay style={StyleSheet.absoluteFillObject}>{children}</FullWindowOverlay>
    </Portal>
  );
};

export const ActionSheetContainer = forwardRef<ActionSheetRef, ActionSheetContainerProps>(
  ({ children, portal }, ref) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const { width, height } = useWindowDimensions();
    const { left, bottom, right } = useSafeAreaInsets();

    const containerOpacity = useSharedValue(0);
    const contentTranslateY = useSharedValue(height);

    useImperativeHandle(
      ref,
      () => ({
        open() {
          Keyboard.dismiss();
          contentTranslateY.value = withTiming(0);
          containerOpacity.value = withTiming(MAX_CONTAINER_OPACITY);
        },
      }),
      [containerOpacity, contentTranslateY],
    );

    const cancel = (): void => {
      contentTranslateY.value = withTiming(height);
      containerOpacity.value = withTiming(0);
    };

    const onPanUpdate = (event: GestureUpdateEvent<PanGestureHandlerEventPayload>): void => {
      if (event.translationY > 0) {
        contentTranslateY.value = event.translationY;
      } else {
        contentTranslateY.value = event.translationY / SWIPE_UP_DELAY_COEFFICIENT;
      }
    };
    const onPanEnd = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>): void => {
      if (event.velocityY > MIN_VELOCITY_Y_TO_CLOSE_ACTION_SHEET) {
        runOnJS(cancel)();
      } else {
        contentTranslateY.value = withTiming(0, { duration: 100 });
      }
    };

    const animatedContentStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: contentTranslateY.value }],
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      display: containerOpacity.value ? 'flex' : 'none',
      backgroundColor: `rgba(0,0,0,${containerOpacity.value})`,
    }));

    const { contentWrapperStyle, contentContainerStyle } = useMemo(() => {
      const bottomSpace = bottom || DEFAULT_PADDING;
      const leftSpace = left || DEFAULT_PADDING;
      const rightSpace = right || DEFAULT_PADDING;

      const contentHeight = width < height ? height / 2 : height;

      return {
        contentWrapperStyle: {
          width,
          paddingLeft: leftSpace,
          paddingRight: rightSpace,
          paddingBottom: bottomSpace,
          maxHeight: contentHeight,
        },
        contentContainerStyle: {
          maxHeight: contentHeight - bottomSpace,
        },
      };
    }, [width, height, bottom, left, right]);

    return (
      <ActionSheetContainerParent portal={portal}>
        <Animated.View onTouchEnd={cancel} style={[styles.container, animatedContainerStyle]}>
          <GestureDetector gesture={Gesture.Pan().onUpdate(onPanUpdate).onEnd(onPanEnd)}>
            <View style={[styles.contentWrapper, contentWrapperStyle]}>
              <Animated.View
                style={[styles.contentContainer, contentContainerStyle, animatedContentStyle]}>
                <View style={[styles.childrenContainer, { backgroundColor: colors.tertiary }]}>
                  {Children.map(children, (child, index) => {
                    if (!child) {
                      return null;
                    }

                    const _child = child as ReactElement<ActionSheetButtonProps>;

                    const onChildPress = (): void => {
                      cancel();
                      _child.props.onPress?.();
                    };

                    const isLastChild = Array.isArray(children) && index === children.length - 1;

                    return cloneElement(
                      _child,
                      isLastChild
                        ? { containerStyle: { borderBottomWidth: 0 }, onPress: onChildPress }
                        : { onPress: onChildPress },
                    );
                  })}
                </View>

                <ActionSheetButton
                  containerStyle={styles.cancelContainer}
                  titleStyle={styles.cancelTitle}
                  title={t('cancel')}
                  onPress={cancel}
                />
              </Animated.View>
            </View>
          </GestureDetector>
        </Animated.View>
      </ActionSheetContainerParent>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  },
  contentContainer: {
    overflow: 'hidden',
  },

  childrenContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  cancelContainer: {
    marginTop: 10,
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  cancelTitle: {
    fontSize: 18,
  },
});
