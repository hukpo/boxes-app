import { useNavigation } from '@react-navigation/core';
import { DependencyList, FC, useLayoutEffect, useState } from 'react';

type NavigationOptions = {
  headerTitle: string;
  headerLeft: FC | undefined;
  headerRight: FC | undefined;
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
