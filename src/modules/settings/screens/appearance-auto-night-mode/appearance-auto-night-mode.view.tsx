import React from 'react';
import { container } from 'tsyringe';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { ThemeStore } from '@/stores';
import { AutoNightMode } from '../../models';
import { ListContainer, ListItem } from '@/components';

export const AppearanceAutoNightMode = observer(() => {
  const { t } = useTranslation(['settings']);
  const themeStore = container.resolve(ThemeStore);
  const headerHeight = useHeaderHeight();
  const bottomMenuHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: bottomMenuHeight,
      }}>
      <ListContainer>
        <ListItem
          title={t('system')}
          selected={themeStore.autoNightMode === AutoNightMode.SYSTEM}
          onPress={themeStore.selectSystemMode}
        />
        <ListItem
          title={t('disabled')}
          selected={themeStore.autoNightMode === AutoNightMode.DISABLED}
          onPress={themeStore.selectDisabledMode}
        />
      </ListContainer>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
