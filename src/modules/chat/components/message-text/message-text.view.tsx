import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useVm } from '@/hooks';
import { useTheme } from '@/themes';
import { getHHMM } from '@/helpers';
import { useStores } from '@/stores';
import { PopupMenu, Text } from '@/ui-kit';
import { MessageTextVm } from './message-text.vm';
import { ChatMessageObject, ChatMessageText } from '../../models';

type MessageTextProps = {
  message: ChatMessageObject<ChatMessageText>;
  style?: StyleProp<ViewStyle>;
};

export const MessageText: FC<MessageTextProps> = ({ style, message }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { uiStore } = useStores();
  const vm = useVm(MessageTextVm, message);

  return (
    <PopupMenu
      style={[styles.container, { backgroundColor: colors.tertiary }, style]}
      items={[
        {
          title: t('delete'),
          onPress: vm.popumMenuActions.delete,
          destructive: true,
          systemIcon: { name: 'trash' },
        },
      ]}>
      <Text style={[styles.text, { color: colors.text }]}>{message.text}</Text>

      <Text style={[styles.time, { color: colors.greyLight }]}>
        {getHHMM(message.createdAt, uiStore.is24HourClock)}
      </Text>
    </PopupMenu>
  );
};

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
  },

  time: {
    fontSize: 12,
    marginLeft: 7,
  },
});
