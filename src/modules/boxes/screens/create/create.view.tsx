import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { useVm } from '@/hooks';
import { useTheme } from '@/themes';
import { CreateVm } from './create.vm';
import { BoxType } from '../../models';
import { useHeaderHeight } from '@/navigation';
import { BOX_ROW_IMAGE_HEIGHT } from '../../constants';
import { useCreateNavigation } from './create.navigation';

const CONTAINER_PADDING = 15;

export const Create = observer(() => {
  const vm = useVm(CreateVm);
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight(true);
  const { t } = useTranslation(['boxes']);
  const { type } = useCreateNavigation(vm);

  return (
    <ScrollView style={[styles.container, { paddingTop: headerHeight + CONTAINER_PADDING }]}>
      <View style={[styles.contentContainer, { backgroundColor: colors.tertiary }]}>
        <View
          style={[
            styles.image,
            {
              height: BOX_ROW_IMAGE_HEIGHT,
              borderRadius: BOX_ROW_IMAGE_HEIGHT / 2,
              backgroundColor: colors.primaryTransparent,
            },
          ]}
        />

        <TextInput
          autoFocus={true}
          clearButtonMode="while-editing"
          style={[styles.input, { color: colors.text }]}
          placeholder={t(type === BoxType.FOLDER ? 'folderName' : 'chatName')}
          placeholderTextColor={colors.greyLight}
          value={vm.boxName.value}
          onChangeText={vm.boxName.setValue}
        />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CONTAINER_PADDING,
  },
  contentContainer: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },

  image: {
    aspectRatio: 1,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 20,
  },
});
