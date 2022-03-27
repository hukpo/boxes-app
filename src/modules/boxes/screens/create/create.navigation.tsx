import { Platform } from 'react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useRoute } from '@react-navigation/core';

import { CreateVm } from './create.vm';
import { Box, BoxType } from '../../models';
import { HeaderButton, useNavigationOptions } from '@/navigation';

export const useCreateNavigation = (vm: CreateVm): { type: BoxType } => {
  const { t } = useTranslation();
  const {
    params: { type, parentId },
  } = useRoute<Route<string, { type: BoxType; parentId: Box['parentId'] }>>();

  useEffect(() => {
    vm.setType(type);
    vm.setParentId(parentId);
  }, [vm, type, parentId]);

  useNavigationOptions(
    () => ({
      headerTitle: t(type === BoxType.FOLDER ? 'createFolder' : 'createChat', { ns: 'boxes' }),
      headerRight: () => <HeaderButton title={t('save')} onPress={vm.saveBox} disabled={!vm.name.value.trim()} />,
      ...Platform.select({
        ios: {
          headerLeft: () => <HeaderButton />,
        },
      }),
    }),
    [t, type, vm.name.value, vm.saveBox],
  );

  return { type };
};
