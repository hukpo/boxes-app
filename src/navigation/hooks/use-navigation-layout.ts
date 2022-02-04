import { useMemo } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useNavigationLayout = (): { style: { paddingTop: number; paddingBottom: number } } => {
  const headerHeight = useHeaderHeight();
  const bottomMenuHeight = useBottomTabBarHeight();

  const style = useMemo(
    () => ({
      paddingTop: headerHeight,
      paddingBottom: bottomMenuHeight,
    }),
    [headerHeight, bottomMenuHeight],
  );

  return { style };
};
