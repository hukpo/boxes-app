import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useVm } from '@hooks';
import { ListVm } from './list.vm';
import { useNavigationLayout } from '@navigation';
import { ListItem, ListContainer } from '@components';

export const List: FC = () => {
  const vm = useVm(ListVm);
  const { style } = useNavigationLayout();
  const { t } = useTranslation(['settings']);
  const { left, right } = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[style, { paddingLeft: left, paddingRight: right }]}>
      <ListContainer>
        <ListItem
          title={t('appearance')}
          hasArrow
          onPress={vm.openAppearance}
          iconName="blur"
          iconBackground="#32c0fc"
        />
        <ListItem title={t('language')} hasArrow onPress={vm.openLanguage} iconName="global" iconBackground="#c700c7" />
      </ListContainer>

      <ListContainer style={styles.listContainer}>
        <ListItem title={t('logOut')} titleStyle="destructive" onPress={vm.logOut} />
      </ListContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  listContainer: {
    marginTop: 10,
  },
});
