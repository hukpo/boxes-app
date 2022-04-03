import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVm } from '@/hooks';
import { EditVm } from './edit.vm';
import { BoxType } from '../../types';
import { ActionSheetRef, List } from '@/ui-kit';
import { PHOTO_PREVIEW_SIZE } from '../../constants';
import { useEditNavigation } from './edit.navigation';
import { PhotoSheet, SelectPhoto } from '@/components';

export const Edit = observer(() => {
  const vm = useVm(EditVm);
  const { t } = useTranslation(['boxes']);
  const photoSheetRef = useRef<ActionSheetRef>(null);

  useEditNavigation(vm);

  const changePhoto = (): void => {
    photoSheetRef.current?.open();
  };

  if (!vm.parent) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SelectPhoto
          hasButton
          size={PHOTO_PREVIEW_SIZE}
          onPress={changePhoto}
          boxType={vm.parent.type}
          source={vm.photo.selected?.source}
        />

        <List.Container style={styles.editText}>
          <List.Item
            inputProps={{
              value: vm.name.value,
              clearButtonMode: 'always',
              onChangeText: vm.name.setValue,
              placeholder: t(vm.parent.type === BoxType.FOLDER ? 'folderName' : 'chatName'),
            }}
          />
        </List.Container>
      </SafeAreaView>

      <PhotoSheet
        ref={photoSheetRef}
        selected={!!vm.photo.selected}
        onGalleryPress={vm.photo.openGallery}
        onRemovePress={vm.photo.removePhoto}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  editText: {
    marginTop: 15,
    alignSelf: 'stretch',
  },
  name: {
    width: 300,
    fontSize: 30,
  },
});
