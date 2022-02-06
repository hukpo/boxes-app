import React from 'react';
import { observer } from 'mobx-react-lite';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useVm } from '@/hooks';
import { logger } from '@/helpers';
import { useTheme } from '@/themes';
import { PopupMenu, Text } from '@/ui-kit';
import { useMessageDefaults } from '../../hooks';
import { MessageTextVm } from './message-text.vm';
import { ChatMessageObject, ChatMessageText } from '../../models';

type MessageTextProps = {
  message: ChatMessageObject<ChatMessageText>;
  style?: StyleProp<ViewStyle>;
};

export const MessageText = observer<MessageTextProps>(({ style, message }) => {
  const { colors } = useTheme();
  const vm = useVm(MessageTextVm, message);
  const { time, popupMenuItems } = useMessageDefaults(message);

  return (
    <PopupMenu style={[styles.container, { backgroundColor: colors.tertiary }, style]} items={popupMenuItems}>
      <Text style={styles.text}>
        {vm.textChunks.map((chunk, index) => {
          switch (chunk.type) {
            case 'text':
              return (
                <Text style={{ color: colors.text }} key={index}>
                  {chunk.text}
                </Text>
              );

            case 'uri':
              const onPress = (): void => {
                InAppBrowser.open(chunk.text, {
                  animated: true,
                  modalEnabled: true,
                  enableBarCollapsing: true,
                  modalPresentationStyle: 'overFullScreen',

                  preferredBarTintColor: colors.secondary,
                  preferredControlTintColor: colors.primary,

                  // TODO ANDROID
                }).catch(logger.error);
              };

              return (
                <Text
                  key={index}
                  style={{ color: colors.primary }}
                  highlightColor={colors.primaryTransparent}
                  onPress={onPress}>
                  {chunk.text}
                </Text>
              );

            default:
              return null;
          }
        })}
      </Text>

      <Text style={[styles.time, { color: colors.greyLight }]}>{time}</Text>
    </PopupMenu>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginRight: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'baseline',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 0,
  },

  text: {
    fontSize: 16,
    flexShrink: 1,
    lineHeight: 20,
  },

  time: {
    fontSize: 12,
    marginLeft: 7,
  },
});
