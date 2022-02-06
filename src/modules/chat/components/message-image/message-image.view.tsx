import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@/themes';
import { useMessageDefaults } from '../../hooks';
import { Image, PopupMenu, Text } from '@/ui-kit';
import { MessageImageVm } from './message-image.vm';
import { useRealmObjectUpdate, useVm } from '@/hooks';
import { PinchableView, ZoomableView } from '@/components';
import { ChatMessageObject, ChatMessageImage, ChatMessageImageUploadStatus } from '../../models';

type MessageTextProps = {
  message: ChatMessageObject<ChatMessageImage>;
  style?: StyleProp<ViewStyle>;
};

export const MessageImage = observer<MessageTextProps>(({ style, message }) => {
  const { colors } = useTheme();
  const vm = useVm(MessageImageVm);
  const { time, popupMenuItems } = useMessageDefaults(message);

  useRealmObjectUpdate(message);

  useEffect(() => {
    if (message.key) {
      vm.getUri(message.key);
    }
  }, [vm, message.key]);

  return (
    <PopupMenu style={[styles.container, { backgroundColor: colors.tertiary }, style]} items={[popupMenuItems.delete]}>
      <PinchableView>
        <ZoomableView>
          <View style={[styles.imageContainer, { aspectRatio: message.aspectRatio }]}>
            {message.status === ChatMessageImageUploadStatus.IN_PROGRESS ? <Text>Uploading</Text> : null}

            {vm.image ? (
              <Image uri={vm.image.uri} headers={vm.image.headers} style={StyleSheet.absoluteFillObject} />
            ) : null}
          </View>
        </ZoomableView>
      </PinchableView>

      <Text style={[styles.time, { color: colors.greyLight }]}>{time}</Text>
    </PopupMenu>
  );
});

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    borderRadius: 10,
    paddingBottom: 10,
    overflow: 'hidden',
    alignSelf: 'baseline',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 0,
  },

  imageContainer: {
    width: 200,
  },

  time: {
    fontSize: 12,
    marginTop: 10,
    marginRight: 10,
  },
});
