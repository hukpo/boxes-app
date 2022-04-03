import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@/themes';
import { ImageUploadStatus } from '@/types';
import { useRealmObjectUpdate } from '@/hooks';
import { useMessageDefaults } from '../../hooks';
import { Image, PopupMenu, Text } from '@/ui-kit';
import { PinchableView, ZoomableView } from '@/components';
import { ChatMessageObject, ChatMessageImage } from '../../types';

type MessageTextProps = {
  message: ChatMessageObject<ChatMessageImage>;
  style?: StyleProp<ViewStyle>;
};

export const MessageImage: FC<MessageTextProps> = ({ style, message }) => {
  const { colors } = useTheme();
  const { time, popupMenuItems } = useMessageDefaults(message);

  useRealmObjectUpdate(message);

  return (
    <PopupMenu
      style={[styles.container, { backgroundColor: colors.tertiary }, style]}
      items={[popupMenuItems.delete]}>
      <PinchableView>
        <ZoomableView>
          <View style={[styles.imageContainer, { aspectRatio: message.aspectRatio }]}>
            {message.status === ImageUploadStatus.IN_PROGRESS ? <Text>Uploading</Text> : null}

            {message.key ? (
              <Image source={{ uriKey: message.key }} style={StyleSheet.absoluteFillObject} />
            ) : null}
          </View>
        </ZoomableView>
      </PinchableView>

      <Text style={[styles.time, { color: colors.greyLight }]}>{time}</Text>
    </PopupMenu>
  );
};

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
