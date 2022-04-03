import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { BoxType } from '@/modules';
import { useTheme } from '@/themes';
import { Icon, Image, ImageProps, Text } from '@/ui-kit';

type SelectPhotoProps = {
  size: number;
  boxType: BoxType;
  onPress: () => void;
  hasButton?: boolean;
  style?: StyleProp<ViewStyle>;
  source: ImageProps['source'] | undefined;
};

export const SelectPhoto: FC<SelectPhotoProps> = ({
  size,
  boxType,
  hasButton,
  style,
  source,
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation(['gallery']);

  return (
    <>
      <Pressable
        style={[
          styles.container,
          {
            height: size,
            backgroundColor: colors.primaryTransparent,
            borderRadius: boxType === BoxType.CHAT ? size / 2 : size / 4,
          },
          style,
        ]}
        onPress={onPress}>
        {source ? (
          <Image source={source} style={StyleSheet.absoluteFillObject} />
        ) : (
          <Icon name="camera" color={colors.primary} size={size / 1.7} />
        )}
      </Pressable>

      {hasButton ? (
        <TouchableOpacity style={styles.setPhotoButton} onPress={onPress}>
          <Text style={[styles.setPhotoButtonTitle, { color: colors.primary }]}>
            {t('setNewPhoto')}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  setPhotoButton: {
    marginTop: 15,
  },
  setPhotoButtonTitle: {
    fontSize: 18,
  },
});
