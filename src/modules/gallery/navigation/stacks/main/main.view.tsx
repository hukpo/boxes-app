import React, { FC } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Album, Albums } from '../../../screens';
import { HeaderButton, useDefaultScreenOptions } from '@/navigation';

export enum GalleryMainScreen {
  ALBUM = '[GALLERY] ALBUM',
  ALBUMS = '[GALLERY] ALBUMS',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const GalleryMainStack: FC = () => {
  const { t } = useTranslation();
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator screenOptions={defaultScreenOptions}>
      <Screen
        name={GalleryMainScreen.ALBUMS}
        component={Albums}
        options={{
          headerTitle: t('gallery:albums'),
          ...Platform.select({
            ios: {
              headerLeft: () => <HeaderButton title={t('cancel')} />,
            },
          }),
        }}
      />

      <Screen name={GalleryMainScreen.ALBUM} component={Album} />
    </Navigator>
  );
};
