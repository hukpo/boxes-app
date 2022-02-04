import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';

import { Album, Albums } from '../../../screens';
import { Background, HeaderButton } from '@navigation';

export enum GalleryMainScreen {
  ALBUM = '[GALLERY] ALBUM',
  ALBUMS = '[GALLERY] ALBUMS',
}

const { Navigator, Screen } = createStackNavigator();

export const GalleryMainStack: FC = () => {
  const { t } = useTranslation();

  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <Background />,
      }}
    >
      <Screen
        name={GalleryMainScreen.ALBUMS}
        component={Albums}
        options={{
          headerTitle: t('gallery:albums'),
          headerLeft: ({ onPress }) => <HeaderButton title={t('cancel')} onPress={onPress} />,
        }}
      />

      <Screen name={GalleryMainScreen.ALBUM} component={Album} />
    </Navigator>
  );
};
