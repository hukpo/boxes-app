import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  InputAccessoryView,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';

import { Icon } from '@/ui-kit';
import { Box } from '@/modules';
import { useTheme } from '@/themes';
import { Background } from '@/navigation';
import { useValue, useVm } from '@/hooks';
import { ComposerVm } from './composer.vm';

const INPUT_HEIGHT = 40;
const INPUT_PADDING = 10;
const COMPOSER_PADDING = 5;
const INPUT_BORDER_WIDTH = 0.5;
const ATTACHMENT_ICON_HEIGHT = 25;
const MAX_NUMBER_OF_LINES = 13;

type ComposerProps = {
  parentId: Box['_id'] | undefined;
};

export const Composer = observer<ComposerProps>(({ parentId }) => {
  const { colors } = useTheme();
  const { t } = useTranslation(['chat']);
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const initialInputHeight = useValue(0);
  const currentInputHeight = useValue(0);
  const vm = useVm(ComposerVm, parentId);

  const onInputLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent): void => {
    if (!initialInputHeight.value) {
      initialInputHeight.value = layout.height;
    }

    currentInputHeight.value = layout.height;
  };

  const extraInputSpace = (INPUT_PADDING + INPUT_BORDER_WIDTH) * 2;
  const maxInputHeight = MAX_NUMBER_OF_LINES * (initialInputHeight.value - extraInputSpace) + extraInputSpace;
  const composerHeight = currentInputHeight.value + bottom + COMPOSER_PADDING * 2;

  return (
    <InputAccessoryView>
      <View style={styles.composerContainer}>
        <Icon
          style={[styles.attachmentIcon, { marginBottom: (initialInputHeight.value - ATTACHMENT_ICON_HEIGHT) / 2 }]}
          name="paperclip"
          size={ATTACHMENT_ICON_HEIGHT}
          color={colors.greyLight}
          onPress={vm.openGallery}
        />

        <TextInput
          multiline={true}
          onLayout={onInputLayout}
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.secondary,
              maxHeight: initialInputHeight.value ? maxInputHeight : undefined,
            },
          ]}
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
    alignItems: 'flex-end',
    padding: COMPOSER_PADDING,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  composerBackground: {
    zIndex: -1,
    position: 'absolute',
  },

  attachmentIcon: {
    marginHorizontal: 5,
    marginBottom: (INPUT_HEIGHT - ATTACHMENT_ICON_HEIGHT) / 2,
  },

  input: {
    flexGrow: 1,
    fontSize: 16,
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: INPUT_PADDING,
    paddingBottom: INPUT_PADDING,
    borderWidth: INPUT_BORDER_WIDTH,
  },
});
