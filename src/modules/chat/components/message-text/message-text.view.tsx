import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '@/themes';
import { PopupMenu, Text } from '@/ui-kit';
import { useMessageDefaults } from '../../hooks';
import { ChatMessageObject, ChatMessageText } from '../../models';

type MessageTextProps = {
  message: ChatMessageObject<ChatMessageText>;
  style?: StyleProp<ViewStyle>;
};

export const MessageText: FC<MessageTextProps> = ({ style, message }) => {
  const { colors } = useTheme();
  const { time, popupMenuItems } = useMessageDefaults(message);

  return (
    <PopupMenu style={[styles.container, { backgroundColor: colors.tertiary }, style]} items={popupMenuItems}>
      <Text style={[styles.text, { color: colors.text }]}>{message.text}</Text>

      <Text style={[styles.time, { color: colors.greyLight }]}>{time}</Text>
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
