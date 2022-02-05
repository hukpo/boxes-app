import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Button, InputAccessoryView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { Icon } from '@/ui-kit';
import { useVm } from '@/hooks';
import { Box } from '@/modules';
import { useTheme } from '@/themes';
import { Background } from '@/navigation';
import { ComposerVm } from './composer.vm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INPUT_HEIGHT = 40;
const COMPOSER_PADDING = 5;

type ComposerProps = {
  parentId: Box['_id'] | undefined;
};

export const Composer = observer<ComposerProps>(({ parentId }) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { t } = useTranslation(['chat']);
  const vm = useVm(ComposerVm, parentId);

  const composerHeight = INPUT_HEIGHT + bottom + COMPOSER_PADDING * 2;

  return (
    <InputAccessoryView>
      <View style={styles.composerContainer}>
        <Icon
          style={styles.attachmentIcon}
          name="paperclip"
          width={20}
          color={colors.greyLight}
          onPress={vm.openGallery}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border }]}
          value={vm.composerText}
          onChangeText={vm.setComposerText}
          placeholder={t('composerPlaceholder')}
          placeholderTextColor={colors.greyLight}
        />

        <Button disabled={vm.sendButtonDisabled} title={t('send')} onPress={vm.sendMessage} />

        <Background
          absoluteFill={false}
          style={[
            styles.composerBackground,
            {
              width,
              bottom: -bottom,
              height: composerHeight,
            },
          ]}
        />
      </View>
    </InputAccessoryView>
  );
});

const styles = StyleSheet.create({
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: COMPOSER_PADDING,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  composerBackground: {
    position: 'absolute',
    zIndex: -1,
  },

  attachmentIcon: {
    marginHorizontal: 5,
  },

  input: {
    flexGrow: 1,
    fontSize: 16,
    marginRight: 10,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 15,
    height: INPUT_HEIGHT,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
