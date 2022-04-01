import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVm } from '@/hooks';
import { EditVm } from './edit.vm';
import { useTheme } from '@/themes';
import { BoxImage } from '../../components';
import { ActionSheetRef, Text } from '@/ui-kit';
import { useInfoNavigation } from './edit.navigation';
import { ListContainer, ListItem, PhotoSheet } from '@/components';

const IMAGE_SIZE = 120;

export const Edit = observer(() => {
  const vm = useVm(EditVm);
  const { colors } = useTheme();
  const photoSheetRef = useRef<ActionSheetRef>(null);

  useInfoNavigation(vm);

  const changePhoto = (): void => {
    photoSheetRef.current?.open();
  };

  if (!vm.parent) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <BoxImage
          containerStyle={styles.previewItem}
          type={vm.parent.type}
          key={vm.parent._id}
          size={IMAGE_SIZE}
          color={vm.parent.imageBg}
          title={vm.parent.name}
          uriKey={vm.parent.key}
          onPress={changePhoto}
        />

        <TouchableOpacity style={styles.setPhotoButton} onPress={changePhoto}>
          <Text style={[styles.setPhotoButtonTitle, { color: colors.primary }]}>Set New Photo</Text>
        </TouchableOpacity>

        <ListContainer style={styles.editText}>
          <ListItem
            inputProps={{
              value: vm.name.value,
              clearButtonMode: 'always',
              onChangeText: vm.name.setValue,
              placeholder: 'Channel name',
            }}
          />
        </ListContainer>
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
  previewItem: {},
  setPhotoButton: {
    marginTop: 15,
  },
  setPhotoButtonTitle: {
    fontSize: 18,
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
