import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useVm } from '@/hooks';
import { LANGUAGES } from '@/locales';
import { LanguageVm } from './language.vm';
import { useNavigationLayout } from '@/navigation';
import { ListContainer, ListItem } from '@/components';

export const Language = observer(() => {
  const vm = useVm(LanguageVm);
  const { style } = useNavigationLayout();
  const { left, right } = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[style, { paddingLeft: left, paddingRight: right }]}>
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
