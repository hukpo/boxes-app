import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { useVm } from '@/hooks';
import { Text, Button } from '@/ui-kit';
import { WelcomeVm } from './welcome.vm';

export const Welcome: FC = () => {
  const vm = useVm(WelcomeVm);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>

      <Button title="Skip" onPress={vm.createAnonimous} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    justifyContent: 'space-between',
  },
});
