import { useCallback, useEffect } from 'react';
import { useRoute, Route, useFocusEffect } from '@react-navigation/core';

import { MainVm } from './main.vm';
import { Box } from '../../../boxes';
import { useNavigationOptions } from '@/navigation';

export const useMainNavigation = (vm: MainVm): { parentId: Box['_id'] | undefined } => {
  const { params } = useRoute<Route<string, { parentId: Box['_id']; parentName: Box['name'] } | undefined>>();

  useEffect(() => {
    if (params?.parentId) {
      vm.setParentId(params.parentId);
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
    }),
    [params?.parentName],
  );

  return { parentId: params?.parentId };
};
