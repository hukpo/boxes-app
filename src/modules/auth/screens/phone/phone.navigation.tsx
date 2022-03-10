import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PhoneVm } from './phone.vm';
import { HeaderButton, useNavigationOptions } from '@/navigation';

export const usePhoneNavigation = (vm: PhoneVm): void => {
  const { t } = useTranslation();

  useEffect(() => {
    const onBackPress = (): boolean => true;

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  useNavigationOptions(
    () => ({
      headerRight: () => <HeaderButton title={t('next')} onPress={vm.sendCode} disabled={vm.nextButtonDisabled} />,
    }),
    [t, vm.nextButtonDisabled, vm.sendCode],
  );
};
