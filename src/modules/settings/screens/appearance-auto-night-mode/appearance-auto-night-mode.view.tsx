import React from 'react';
import { container } from 'tsyringe';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeStore } from '@/stores';
import { AutoNightMode } from '../../models';
import { useNavigationLayout } from '@/navigation';
import { ListContainer, ListItem } from '@/components';

export const AppearanceAutoNightMode = observer(() => {
  const { style } = useNavigationLayout();
  const { t } = useTranslation(['settings']);
  const { left, right } = useSafeAreaInsets();
  const themeStore = container.resolve(ThemeStore);

  return (
    <ScrollView style={styles.container} contentContainerStyle={[style, { paddingLeft: left, paddingRight: right }]}>
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
