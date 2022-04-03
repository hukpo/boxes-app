import React, { FC } from 'react';
import { container } from 'tsyringe';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/themes';
import { Icon, Text } from '@/ui-kit';
import { Navigation } from '../../navigation';

type HeaderButtonProps = {
  title?: string;
  disabled?: boolean;
  canGoBack?: boolean;
  backIconVisible?: boolean;
  onPress?: () => void;
};

export const HeaderButton: FC<HeaderButtonProps> = ({
  title,
  disabled,
  canGoBack,
  backIconVisible,
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = container.resolve(Navigation);

  if (backIconVisible && !canGoBack) {
    return null;
  }

  if (!title) {
    title = backIconVisible ? t('navigation:back') : t('cancel');
  }

  if (!onPress) {
    onPress = navigation.goBack;
  }

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress}>
      {backIconVisible ? (
        <Icon
          name="arrow.left"
          width={12}
          style={styles.backIcon}
          color={disabled ? colors.textDisabled : colors.primary}
        />
      ) : null}

      <Text style={[styles.title, { color: disabled ? colors.textDisabled : colors.primary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
  backIcon: {
    marginRight: 6.5,
  },
});
