import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, Route, useFocusEffect } from '@react-navigation/core';
import React, { FC, RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { Box } from '../../models';
import { ListVm } from './list.vm';
import { ActionSheetRef } from '@/ui-kit';
import { HeaderButton } from '@/navigation';

export const useListNavigation = (vm: ListVm): { actionSheetRef: RefObject<ActionSheetRef> } => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();
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

  useLayoutEffect(() => {
    const headerRight: FC = () => <HeaderButton title={t('create')} onPress={actionSheetRef.current?.open} />;

    if (params?.parentName) {
      setOptions({
        headerRight,
        headerTitle: params?.parentName,
      });
    } else {
      setOptions({ headerRight });
    }
  }, [setOptions, t, params?.parentName]);

  return {
    actionSheetRef,
  };
};
