import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

type Options = {
  excludeHeight?: number;
  initialHeight?: number;
};

export const useKeyboard = (options: Options = {}): { height: SharedValue<number> } => {
  const initialHeight = options.initialHeight || 0;
  const excludeHeight = options.excludeHeight || 0;

  const height = useSharedValue(initialHeight);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', e => {
      height.value = withTiming(e.endCoordinates.height - excludeHeight, { duration: e.duration });
    });

    const keyboardWillHide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', e => {
      height.value = withTiming(initialHeight, { duration: e.duration });
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [initialHeight, excludeHeight, height]);

  return { height };
};
