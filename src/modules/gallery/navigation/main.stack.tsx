import React, { FC } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Album, Albums } from '../screens';
import { HeaderButton, StackConfig, useDefaultScreenOptions } from '@/navigation';

export enum GalleryMainScreen {
  ALBUM = '[GALLERY] ALBUM',
  ALBUMS = '[GALLERY] ALBUMS',
}

const { Navigator, Screen } = createNativeStackNavigator();

const GalleryMainStack: FC = () => {
  const { t } = useTranslation();
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator screenOptions={defaultScreenOptions}>
      <Screen
        name={GalleryMainScreen.ALBUMS}
        component={Albums}
        options={{
          headerTitle: t('gallery:albums'),
          // TODO CHECK ALL CASES AND ENABLE FOR ANDROID
          ...Platform.select({
            ios: {
              headerLeft: () => <HeaderButton />,
            },
          }),
        }}
      />

      <Screen name={GalleryMainScreen.ALBUM} component={Album} />
    </Navigator>
  );
};

export const GalleryMainStackConfig: StackConfig = {
  parentOptions: {
    headerShown: false,
  },
  screens: [
    {
      name: '[STACKS] GALLERY MAIN',
      children: Object.values(GalleryMainScreen),
      component: GalleryMainStack,
      options: {
        presentation: 'modal',
      },
    },
  ],
};
