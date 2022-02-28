import { useNavigation } from '@react-navigation/core';
import { DependencyList, ReactElement, useLayoutEffect, useState } from 'react';

type NavigationOptions = {
  headerTitle: string;
  headerRight: () => ReactElement;
};

export const useNavigationOptions = (
  getOptions: (navigation: ReturnType<typeof useNavigation>) => Partial<NavigationOptions>,
  deps: DependencyList,
): void => {
  const navigation = useNavigation();
  const [getOptionsRef] = useState(() => getOptions);

  useLayoutEffect(() => {
    navigation.setOptions(getOptionsRef(navigation));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOptionsRef, navigation, ...deps]);
};
