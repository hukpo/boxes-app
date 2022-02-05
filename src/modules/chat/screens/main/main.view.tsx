import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, ListRenderItem, View, FlatList } from 'react-native';

import { MainVm } from './main.vm';
import { ChatMessageObject } from '../../models';
import { MESSAGE_MARGIN } from '../../constants';
import { useRealmListUpdate, useVm } from '@/hooks';
import { useMainNavigation } from './main.navigation';
import { Composer, MessageSwitch } from '../../components';

export const Main = observer(() => {
  const vm = useVm(MainVm);
  const { parentId } = useMainNavigation(vm);
  const { left, right } = useSafeAreaInsets();

  useRealmListUpdate(vm.messages);

  const keyExtractor = useCallback((item: ChatMessageObject) => item._id, []);

  const renderItem = useCallback<ListRenderItem<ChatMessageObject>>(({ item }) => {
    return <MessageSwitch message={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingLeft: left,
            paddingRight: right,
          },
        ]}
        data={vm.messages}
        inverted={true}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        keyboardDismissMode="interactive"
        {...{ automaticallyAdjustKeyboardInsets: true }}
      />

      <Composer parentId={parentId} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    paddingTop: MESSAGE_MARGIN,
  },
});
