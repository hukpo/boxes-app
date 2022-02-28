import { BackHandler } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import React, { FC, useEffect, useLayoutEffect } from 'react';

import { PhoneVm } from './phone.vm';
import { HeaderButton } from '@/navigation';

export const usePhoneNavigation = (vm: PhoneVm): void => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();

  useEffect(() => {
    const onBackPress = (): boolean => true;

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  useLayoutEffect(() => {
    const headerRight: FC = () => (
      <HeaderButton title={t('next')} onPress={vm.sendCode} disabled={vm.nextButtonDisabled} />
    );

    setOptions({ headerRight });
  }, [setOptions, t, vm.nextButtonDisabled, vm.sendCode]);
};
