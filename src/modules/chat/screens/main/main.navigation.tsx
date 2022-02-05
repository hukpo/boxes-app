import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useRoute, Route, useFocusEffect, useNavigation } from '@react-navigation/core';

import { MainVm } from './main.vm';
import { Box } from '../../../boxes';

export const useMainNavigation = (vm: MainVm): { parentId: Box['_id'] | undefined } => {
  const { setOptions } = useNavigation();
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

  useLayoutEffect(() => {
    setOptions({
      headerTitle: params?.parentName,
    });
  }, [setOptions, params?.parentName]);

  return { parentId: params?.parentId };
};
