import React, { useCallback, useEffect } from 'react';
import { useRoute, Route, useFocusEffect } from '@react-navigation/core';

import { MainVm } from './main.vm';
import { useNavigationOptions } from '@/navigation';
import { Box, BoxImageHeader } from '../../../boxes';

export const useMainNavigation = (vm: MainVm): { parentId: Box['_id'] | undefined } => {
  const { params } =
    useRoute<Route<string, { parentId: Box['_id']; parentName: Box['name'] } | undefined>>();

  useEffect(() => {
    if (params?.parentId) {
      vm.setParent(params.parentId);
    }
  }, [vm, params?.parentId]);

  useFocusEffect(
    useCallback(() => {
      vm.getMessages();
    }, [vm]),
  );

  useNavigationOptions(
    () => ({
      headerTitle: params?.parentName,
      headerRight: () => (vm.parent ? <BoxImageHeader box={vm.parent} /> : null),
    }),
    [params?.parentName, vm.parent],
  );

  return { parentId: params?.parentId };
};
