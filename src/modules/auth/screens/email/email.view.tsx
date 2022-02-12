import React, { FC } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useVm } from '@/hooks';
import { EmailVm } from './email.vm';

export const Email: FC = () => {
  const vm = useVm(EmailVm);

  return (
    <View style={styles.container}>
      <Button title="Send Email" onPress={vm.sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
