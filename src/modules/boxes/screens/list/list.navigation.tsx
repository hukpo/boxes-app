import { useTranslation } from 'react-i18next';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useRoute, Route, useFocusEffect } from '@react-navigation/core';

import { Box } from '../../types';
import { ListVm } from './list.vm';
import { ActionSheetRef } from '@/ui-kit';
import { useNavigationOptions } from '@/navigation';

export const useListNavigation = (vm: ListVm): { actionSheetRef: RefObject<ActionSheetRef> } => {
  const { t } = useTranslation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { params } = useRoute<Route<string, { parentId: Box['parentId']; parentName: Box['name'] } | undefined>>();

  useEffect(() => {
    if (params?.parentId) {
      vm.setParentId(params.parentId);
    }
  }, [vm, params?.parentId]);

  useFocusEffect(
    useCallback(() => {
      vm.getBoxes();
    }, [vm]),
  );

  useNavigationOptions(
    () => ({
      headerTitle: params?.parentName || t('boxes:boxes'),
    }),
    [params?.parentName, t],
  );

  return {
    actionSheetRef,
  };
};
