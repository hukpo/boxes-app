import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import React, { Fragment, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Platform,
  TextInput,
  StyleSheet,
  LayoutChangeEvent,
  InputAccessoryView,
  useWindowDimensions,
} from 'react-native';

import { Icon } from '@/ui-kit';
import { Box } from '@/modules';
import { useTheme } from '@/themes';
import { Background } from '@/navigation';
import { useValue, useVm } from '@/hooks';
import { ComposerVm, ComposerMethods } from './composer.vm';

const INPUT_PADDING = 10;
const COMPOSER_PADDING_VERTICAL = 5;
const INPUT_BORDER_WIDTH = 0.5;
const MAX_NUMBER_OF_LINES = 13;

const SEND_ICON_HEIGHT = 25;
// const EDIT_ICON_HEIGHT = 25;
const ATTACHMENT_ICON_HEIGHT = 25;
const ICON_MARGIN_HORIZONTAL = 5;

type ComposerProps = {
  parentId: Box['_id'] | undefined;
};

const Container = Platform.OS === 'ios' ? InputAccessoryView : Fragment;

export const Composer = observer<ComposerProps>(({ parentId }) => {
  const inputRef = useRef<TextInput>(null);
  const vm = useVm(ComposerVm, parentId, {
    focus: () => inputRef.current?.focus(),
  } as ComposerMethods);

  const { colors } = useTheme();
  const { t } = useTranslation(['chat']);
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const initialInputHeight = useValue(0);
  const currentInputHeight = useValue(0);

  const onInputLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent): void => {
    if (!initialInputHeight.value) {
      initialInputHeight.value = layout.height;
    }

    currentInputHeight.value = layout.height;
  };

  const extraInputSpace = (INPUT_PADDING + INPUT_BORDER_WIDTH) * 2;
  const maxInputHeight = MAX_NUMBER_OF_LINES * (initialInputHeight.value - extraInputSpace) + extraInputSpace;
  const composerHeight = currentInputHeight.value + bottom + COMPOSER_PADDING_VERTICAL * 2;

  return (
    <Container style={styles.container}>
      {/* <View style={styles.editContainer}>
        <Icon style={styles.editIcon} name="edit" size={EDIT_ICON_HEIGHT} color={colors.primary} />

        <View style={styles.editInfoContainer}>
          <View style={{ width: 3, borderRadius: 5, height: 40, marginRight: 5, backgroundColor: colors.primary }} />

          <View>
            <Text style={[styles.editMessageText, { color: colors.primary }]}>Edit Message</Text>
            <Text style={[styles.editMessageText, { color: colors.text }]} numberOfLines={1}>
              #progress Added fastlane for iOS Add...
            </Text>
          </View>
        </View>

        <Icon style={styles.editIcon} name="close" size={EDIT_ICON_HEIGHT} color={colors.primary} />
      </View> */}

      <View style={styles.composerContainer}>
        <Icon
          style={[styles.attachmentIcon, { marginBottom: (initialInputHeight.value - ATTACHMENT_ICON_HEIGHT) / 2 }]}
          name="paperclip"
          size={ATTACHMENT_ICON_HEIGHT}
          color={colors.greyLight}
          onPress={vm.openGallery}
        />

        <TextInput
          ref={inputRef}
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
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Icon
          style={[styles.sendIcon, { marginBottom: (initialInputHeight.value - SEND_ICON_HEIGHT) / 2 }]}
          name="send"
          size={SEND_ICON_HEIGHT}
          onPress={vm.sendButtonDisabled ? undefined : vm.sendMessage}
          color={vm.sendButtonDisabled ? colors.textDisabled : colors.primary}
        />

        {/* <Button disabled={vm.sendButtonDisabled} title={t('send')} onPress={vm.sendMessage} /> */}

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
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: COMPOSER_PADDING_VERTICAL,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  composerBackground: {
    zIndex: -1,
    position: 'absolute',
  },

  attachmentIcon: {
    marginHorizontal: ICON_MARGIN_HORIZONTAL,
  },
  sendIcon: {
    marginHorizontal: ICON_MARGIN_HORIZONTAL,
  },

  input: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: INPUT_PADDING,
    paddingBottom: INPUT_PADDING,
    borderWidth: INPUT_BORDER_WIDTH,
    fontWeight: '500',
  },

  editContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',

    backgroundColor: 'rgba(255,0,0,0.2)',
  },
  editIcon: {
    marginHorizontal: 5,
  },
  editMessageText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  editInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
});
