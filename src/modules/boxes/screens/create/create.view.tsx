import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View, Image } from 'react-native';

import { useVm } from '@/hooks';
import { useTheme } from '@/themes';
import { BoxType } from '../../types';
import { CreateVm } from './create.vm';
import { PhotoSheet } from '@/components';
import { useHeaderHeight } from '@/navigation';
import { ActionSheetRef, Icon } from '@/ui-kit';
import { useCreateNavigation } from './create.navigation';
import { BOX_ROW_ICON_HEIGHT, BOX_ROW_IMAGE_HEIGHT } from '../../constants';

const CONTAINER_PADDING = 15;

export const Create = observer(() => {
  const vm = useVm(CreateVm);
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight(true);
  const { t } = useTranslation(['boxes']);
  const { type } = useCreateNavigation(vm);
  const photoSheetRef = useRef<ActionSheetRef>(null);

  const onImagePress = (): void => {
    photoSheetRef.current?.open();
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: headerHeight + CONTAINER_PADDING }]}>
        <View style={[styles.contentContainer, { backgroundColor: colors.tertiary }]}>
          <Pressable
            style={[
              styles.image,
              {
                height: BOX_ROW_IMAGE_HEIGHT,
                borderRadius: BOX_ROW_IMAGE_HEIGHT / 2,
                backgroundColor: colors.primaryTransparent,
              },
            ]}
            onPress={onImagePress}>
            {vm.photo.selected ? (
              <Image source={{ uri: vm.photo.selected.uri }} style={StyleSheet.absoluteFillObject} />
            ) : (
              <Icon name="camera" color={colors.primary} size={BOX_ROW_ICON_HEIGHT} />
            )}
          </Pressable>

          <TextInput
            autoFocus={true}
            clearButtonMode="while-editing"
            style={[styles.input, { color: colors.text }]}
            placeholder={t(type === BoxType.FOLDER ? 'folderName' : 'chatName')}
            placeholderTextColor={colors.greyLight}
            value={vm.name.value}
            onChangeText={vm.name.setValue}
          />
        </View>
      </View>

      <PhotoSheet
        portal
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
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 20,
  },
});
