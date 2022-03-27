import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import React, { Fragment, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  InputAccessoryView,
  useWindowDimensions,
} from 'react-native';

import { Box } from '@/modules';
import { useTheme } from '@/themes';
import { Icon, Text } from '@/ui-kit';
import { Background } from '@/navigation';
import { useValue, useVm } from '@/hooks';
import { ComposerVm, ComposerMethods } from './composer.vm';

const INPUT_PADDING = 10;
const COMPOSER_PADDING_VERTICAL = 5;
const INPUT_BORDER_WIDTH = 0.5;
const MAX_NUMBER_OF_LINES = 13;

const ICON_SPACE = 35;

const ATTACHMENT_ICON_HEIGHT = 25;
const SEND_ICON_HEIGHT = 25;
const EDIT_ICON_HEIGHT = 25;
const CLOSE_ICON_HEIGHT = 13;

const EDIT_TEXT_LINE_HEIGHT = 18;
const EDIT_CONTAINER_PADDING_VERTICAL = 5;
const EDIT_CONTAINER_HEIGHT = EDIT_TEXT_LINE_HEIGHT * 2 + EDIT_CONTAINER_PADDING_VERTICAL * 2;

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
    if (!initialInputHeight()) {
      initialInputHeight(layout.height);
    }

    currentInputHeight(layout.height);
  };

  const extraInputSpace = (INPUT_PADDING + INPUT_BORDER_WIDTH) * 2;
  const maxInputHeight = MAX_NUMBER_OF_LINES * (initialInputHeight() - extraInputSpace) + extraInputSpace;
  const composerHeight =
    bottom + currentInputHeight() + COMPOSER_PADDING_VERTICAL * 2 + (vm.editMessageText ? EDIT_CONTAINER_HEIGHT : 0);

  return (
    <Container style={styles.container}>
      <View style={[{ borderColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth }]}>
        {vm.editMessagePreviewText ? (
          <View style={styles.editContainer}>
            <Icon style={styles.editIcon} name="pencil" size={EDIT_ICON_HEIGHT} color={colors.primary} />

            <View style={styles.editInfoContainer}>
              <View style={[styles.editSeparator, { backgroundColor: colors.primary }]} />

              <View>
                <Text style={[styles.editMessageText, { color: colors.primary }]}>{t('editMessage')}</Text>
                <Text style={[styles.editMessageText, { color: colors.text }]} numberOfLines={1}>
                  {vm.editMessagePreviewText}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={vm.cancelEdit}>
              <Icon style={styles.closeIcon} name="close" size={CLOSE_ICON_HEIGHT} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.composerContainer}>
          <TouchableOpacity onPress={vm.openGallery}>
            <Icon
              style={[styles.attachmentIcon, { marginBottom: (initialInputHeight() - ATTACHMENT_ICON_HEIGHT) / 2 }]}
              name="paperclip"
              size={ATTACHMENT_ICON_HEIGHT}
              color={colors.greyLight}
            />
          </TouchableOpacity>

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
                maxHeight: initialInputHeight() ? maxInputHeight : undefined,
              },
            ]}
            value={vm.composerText}
            onChangeText={vm.setComposerText}
            placeholder={t('composerPlaceholder')}
            placeholderTextColor={colors.greyLight}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity disabled={vm.sendButtonDisabled} onPress={vm.sendMessage}>
            <Icon
              style={[styles.sendIcon, { marginBottom: (initialInputHeight() - SEND_ICON_HEIGHT) / 2 }]}
              name="send"
              size={SEND_ICON_HEIGHT}
              color={vm.sendButtonDisabled ? colors.textDisabled : colors.primary}
            />
          </TouchableOpacity>

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
  },
  composerBackground: {
    zIndex: -1,
    position: 'absolute',
  },

  attachmentIcon: {
    margin: (ICON_SPACE - ATTACHMENT_ICON_HEIGHT) / 2,
  },
  sendIcon: {
    margin: (ICON_SPACE - SEND_ICON_HEIGHT) / 2,
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
  },

  editContainer: {
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: EDIT_CONTAINER_PADDING_VERTICAL,
  },
  editSeparator: {
    width: 3,
    marginRight: 5,
    borderRadius: 5,
    height: EDIT_TEXT_LINE_HEIGHT * 2,
  },
  editIcon: {
    margin: (ICON_SPACE - EDIT_ICON_HEIGHT) / 2,
  },
  closeIcon: {
    margin: (ICON_SPACE - CLOSE_ICON_HEIGHT) / 2,
  },
  editMessageText: {
    fontSize: 14,
    lineHeight: EDIT_TEXT_LINE_HEIGHT,
  },
  editInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});
