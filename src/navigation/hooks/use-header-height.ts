import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

export const useHeaderHeight = (modalPresentation = false): number => {
  const layout = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(
    layout,
    modalPresentation,
    modalPresentation ? 0 : insets.top,
  );

  return headerHeight;
};
