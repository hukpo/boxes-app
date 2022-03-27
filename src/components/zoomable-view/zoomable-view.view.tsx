import { Portal } from '@gorhom/portal';
import React, { cloneElement, FC, ReactElement, useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureTouchEvent,
  GestureUpdateEvent,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

type ZoomableViewProps = {
  children: ReactElement<{ style: StyleProp<any> }>;
};

export const ZoomableView: FC<ZoomableViewProps> = ({ children }: ZoomableViewProps) => {
  const window = useWindowDimensions();
  const [childLayout, setChildLayout] = useState({ width: 0, height: 0 });
  const [childPosition, setChildPosition] = useState({ left: 0, top: 0 });

  const pinchScale = useSharedValue(1);
  const pinchOriginX = useSharedValue(0);
  const pinchOriginY = useSharedValue(0);
  const pinchTranslateX = useSharedValue(0);
  const pinchTranslateY = useSharedValue(0);

  const zoomableTop = useSharedValue(0);
  const zoomableLeft = useSharedValue(0);
  const zoomableWidth = useSharedValue(0);
  const zoomableHeight = useSharedValue(0);
  const zoomableActive = useDerivedValue(
    () =>
      zoomableTop.value !== childPosition.top ||
      zoomableLeft.value !== childPosition.left ||
      zoomableWidth.value !== childLayout.width ||
      zoomableHeight.value !== childLayout.height,
    [childPosition.top, childPosition.left, childLayout.width, childLayout.height],
  );

  const zoomableMaxWidth = window.width;
  const zoomableMaxHeight = (zoomableMaxWidth / childLayout.width) * childLayout.height;
  const initialZoomableLeft = 0;
  const initialZoomableTop = (window.height - zoomableMaxHeight) / 2;

  const onChildLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent): void => {
    setChildLayout({ width: layout.width, height: layout.height });

    zoomableWidth.value = layout.width;
    zoomableHeight.value = layout.height;
  };

  const resetPinchValues = (): void => {
    pinchScale.value = withTiming(1);
    pinchOriginX.value = withTiming(0);
    pinchOriginY.value = withTiming(0);
    pinchTranslateX.value = withTiming(0);
    pinchTranslateY.value = withTiming(0);
  };

  const onTapTouchesUp = ({ allTouches: [touch] }: GestureTouchEvent): void => {
    const childPositionTop = touch.absoluteY - touch.y;
    const childPositionLeft = touch.absoluteX - touch.x;

    runOnJS(setChildPosition)({ left: childPositionLeft, top: childPositionTop });

    zoomableTop.value = childPositionTop;
    zoomableLeft.value = childPositionLeft;
    zoomableWidth.value = childLayout.width;
    zoomableHeight.value = childLayout.height;

    zoomableTop.value = withTiming(initialZoomableTop);
    zoomableLeft.value = withTiming(initialZoomableLeft);
    zoomableWidth.value = withTiming(zoomableMaxWidth);
    zoomableHeight.value = withTiming(zoomableMaxHeight);
  };

  const onPanUpdate = (event: GestureUpdateEvent<PanGestureHandlerEventPayload>): void => {
    zoomableTop.value = initialZoomableTop + event.translationY;

    if (pinchScale.value !== 1) {
      zoomableLeft.value = event.translationX;
    }
  };
  const onPanEnd = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>): void => {
    if (Math.abs(event.velocityY) > 100 || Math.abs(event.translationY) > 300) {
      // reset pan gesture
      zoomableTop.value = withTiming(childPosition.top);
      zoomableLeft.value = withTiming(childPosition.left);
      zoomableWidth.value = withTiming(childLayout.width);
      zoomableHeight.value = withTiming(childLayout.height);

      resetPinchValues();
    } else {
      zoomableTop.value = withTiming(initialZoomableTop);
    }
  };

  const onPinchStart = (event: GestureStateChangeEvent<PinchGestureHandlerEventPayload>): void => {
    pinchOriginX.value = event.focalX - zoomableWidth.value / 2;
    pinchOriginY.value = event.focalY - zoomableHeight.value / 2;
  };
  const onPinchUpdate = (event: GestureUpdateEvent<PinchGestureHandlerEventPayload>): void => {
    pinchScale.value = event.scale > 1 ? event.scale : 1;
    pinchTranslateX.value = event.focalX - zoomableWidth.value / 2 - pinchOriginX.value;
    pinchTranslateY.value = event.focalY - zoomableHeight.value / 2 - pinchOriginY.value;
  };

  const onDoubleTapEnd = (): void => {
    resetPinchValues();

    zoomableTop.value = withTiming(initialZoomableTop);
    zoomableLeft.value = withTiming(initialZoomableLeft);
  };

  const animatedChildStyle = useAnimatedStyle(() => ({
    opacity: zoomableActive.value ? 0 : 1,
  }));

  const animatedZoomableStyle = useAnimatedStyle(() => ({
    display: zoomableActive.value ? 'flex' : 'none',
    top: zoomableTop.value,
    left: zoomableLeft.value,
    width: zoomableWidth.value,
    height: zoomableHeight.value,
    transform: [
      { translateX: pinchTranslateX.value },
      { translateY: pinchTranslateY.value },
      { translateX: pinchOriginX.value },
      { translateY: pinchOriginY.value },
      { scale: pinchScale.value },
      { translateX: -pinchOriginX.value },
      { translateY: -pinchOriginY.value },
    ],
  }));

  return (
    <>
      <GestureDetector gesture={Gesture.Tap().maxDistance(0).onTouchesUp(onTapTouchesUp)}>
        <Animated.View onLayout={onChildLayout} style={animatedChildStyle}>
          {children}
        </Animated.View>
      </GestureDetector>

      <Portal>
        <GestureDetector
          gesture={Gesture.Race(
            Gesture.Pan().onUpdate(onPanUpdate).onEnd(onPanEnd),
            Gesture.Pinch().onStart(onPinchStart).onUpdate(onPinchUpdate),
            Gesture.Tap().numberOfTaps(2).onEnd(onDoubleTapEnd),
          )}>
          <Animated.View style={[styles.zoomableContainer, animatedZoomableStyle]}>
            {cloneElement(children, {
              style: StyleSheet.flatten([
                children.props.style,
                { width: undefined, height: undefined, aspectRatio: undefined },
                StyleSheet.absoluteFillObject,
              ]),
            })}
          </Animated.View>
        </GestureDetector>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  zoomableContainer: {
    position: 'absolute',
  },
});
