import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useRoute } from '@react-navigation/core';

import { Box } from '../../types';
import { InfoVm } from './info.vm';
import { HeaderButton, useNavigationOptions } from '@/navigation';

export const useInfoNavigation = (vm: InfoVm): void => {
  const {
    params: { boxId },
  } = useRoute<Route<string, { boxId: Box['parentId'] }>>();
  const { t } = useTranslation();

  useEffect(() => {
    if (boxId) {
      vm.setParent(boxId);
    }
  }, [vm, boxId]);

  useNavigationOptions(
    () => ({
      headerRight: () => <HeaderButton title={t('edit')} onPress={vm.openEditScreen} />,
    }),
    [t, vm.openEditScreen],
  );
};
