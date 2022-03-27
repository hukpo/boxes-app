import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { MessageText } from '../message-text';
import { MessageImage } from '../message-image';
import { MESSAGE_MARGIN } from '../../constants';
import { ChatMessageObject, ChatMessageType } from '../../types';

type MessageSwitch = {
  message: ChatMessageObject;
};

export const MessageSwitch: FC<MessageSwitch> = ({ message }) => {
  switch (message.type) {
    case ChatMessageType.TEXT:
      return <MessageText style={styles.container} message={message} />;

    case ChatMessageType.IMAGE:
      return <MessageImage style={styles.container} message={message} />;

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: MESSAGE_MARGIN,
  },
});
