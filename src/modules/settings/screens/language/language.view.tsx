import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet } from 'react-native';

import { useVm } from '@/hooks';
import { LANGUAGES } from '@/locales';
import { LanguageVm } from './language.vm';
import { useNavigationLayout } from '@/navigation';
import { ListContainer, ListItem } from '@/components';

export const Language = observer(() => {
  const vm = useVm(LanguageVm);
  const { style } = useNavigationLayout();

  return (
    <ScrollView style={styles.container} contentContainerStyle={style}>
      <ListContainer>
        {LANGUAGES.map(({ name, nativeName, code }, index) => {
          const onPress = (): Promise<void> => vm.selectLanguage(code);

          return (
            <ListItem
              key={index}
              title={name}
              subtitle={nativeName}
              onPress={onPress}
              selected={vm.languageCode === code}
            />
          );
        })}
      </ListContainer>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
