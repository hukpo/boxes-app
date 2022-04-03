import React from 'react';
import { useTranslation } from 'react-i18next';

import { CodeVm } from './code.vm';
import { HeaderButton, useNavigationOptions } from '@/navigation';

export const useCodeNavigation = (vm: CodeVm): void => {
  const { t } = useTranslation();

  useNavigationOptions(
    () => ({
      headerTitle: vm.phoneNumber,
      headerRight: () => (
        <HeaderButton
          title={t('next')}
          onPress={vm.confirmPhone}
          disabled={vm.nextButtonDisabled}
        />
      ),
    }),
    [t, vm.confirmPhone, vm.nextButtonDisabled, vm.phoneNumber],
  );
};
