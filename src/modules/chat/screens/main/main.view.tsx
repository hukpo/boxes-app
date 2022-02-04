//TODO button + keyboard android

import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet, ListRenderItem, Button, TextInput, View, FlatList } from 'react-native';

import { Icon } from '@ui-kit';
import { MainVm } from './main.vm';
import { useTheme } from '@themes';
import { Background } from '@navigation';
import { ChatMessageObject } from '../../models';
import { MESSAGE_MARGIN } from '../../constants';
import { MessageSwitch } from '../../components';
import { useMainNavigation } from './main.navigation';
import { useKeyboard, useRealmListUpdate, useVm } from '@hooks';

const INPUT_HEIGHT = 35;
const COMPOSER_PADDING = 5;

export const Main = observer(() => {
  const vm = useVm(MainVm);
  const { colors } = useTheme();
  const { t } = useTranslation(['chat']);
  const headerHeight = useHeaderHeight();
  const { bottom, left, right } = useSafeAreaInsets();
  const { height } = useKeyboard({
    excludeHeight: bottom,
  });

  useMainNavigation(vm);
  useRealmListUpdate(vm.messages);

  const composerHeight = INPUT_HEIGHT + COMPOSER_PADDING * 2 + bottom;

  const keyExtractor = useCallback((item: ChatMessageObject) => item._id, []);

  const renderItem = useCallback<ListRenderItem<ChatMessageObject>>(({ item }) => {
    return <MessageSwitch message={item} />;
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    bottom: height.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <FlatList
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingLeft: left,
            paddingRight: right,
            paddingTop: composerHeight,
            paddingBottom: headerHeight + MESSAGE_MARGIN,
          },
        ]}
        data={vm.messages}
        inverted={true}
        keyboardDismissMode="on-drag"
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      <Background
        absoluteFill={false}
        style={[styles.composerContainer, { borderColor: colors.border, minHeight: composerHeight }]}
      >
        <View style={styles.composerContentContainer}>
          <Icon
            style={styles.attachmentIcon}
            name="paperclip"
            width={20}
            color={colors.greyLight}
            onPress={vm.openGallery}
          />

          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border },
            ]}
            value={vm.composerText}
            onChangeText={vm.setComposerText}
            placeholder={t('composerPlaceholder')}
            placeholderTextColor={colors.greyLight}
          />

          <Button disabled={vm.sendButtonDisabled} title={t('send')} onPress={vm.sendMessage} />
        </View>
      </Background>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
  },

  composerContainer: {
    padding: COMPOSER_PADDING,
    borderTopWidth: StyleSheet.hairlineWidth,
    bottom: 0,
    width: '100%',
    position: 'absolute',
  },
  composerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
