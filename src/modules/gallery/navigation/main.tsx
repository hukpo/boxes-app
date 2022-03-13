import React, { FC } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Album, Albums } from '../screens';
import { HeaderButton, STACKS, NC, useDefaultScreenOptions } from '@/navigation';

export enum GalleryMainScreen {
  ALBUM = '[GALLERY] ALBUM',
  ALBUMS = '[GALLERY] ALBUMS',
}

const Stack = createNativeStackNavigator();

const GalleryMainStack: FC = () => {
  const { t } = useTranslation();
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
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

      <Stack.Screen name={GalleryMainScreen.ALBUM} component={Album} />
    </Stack.Navigator>
  );
};

export const GalleryMainNavigation: NC = ({ Group, Screen }) => {
  return (
    <Group screenOptions={{ headerShown: false }}>
      <Screen
        name={STACKS.GalleryMain.name}
        component={GalleryMainStack}
        options={{
          presentation: 'modal',
        }}
      />
    </Group>
  );
};
