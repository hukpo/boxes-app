import React, { FC, useRef } from 'react';
import { ColorValue, StyleProp, StyleSheet, Switch, View, ViewStyle, Pressable } from 'react-native';

import { useTheme } from '@/themes';
import { Icon, IconProps, Text } from '@/ui-kit';

export type ListItemProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;

  toggled?: boolean;
  selected?: boolean;
  disabled?: boolean;
  hasArrow?: boolean;

  iconName?: IconProps['name'];
  iconColor?: ColorValue;
  iconBackground?: ColorValue;

  titleStyle?: 'destructive';
  infoContainerStyle?: StyleProp<ViewStyle>;
};

export const ListItem: FC<ListItemProps> = ({
  infoContainerStyle,
  title,
  subtitle,
  toggled,
  disabled,
  selected,
  hasArrow,
  iconName,
  titleStyle,
  iconColor = '#fff',
  iconBackground = 'transparent',
  onPress,
}) => {
  const { colors } = useTheme();
  const pressableRef = useRef<View>(null);

  const onPressIn = () => {
    pressableRef.current?.setNativeProps({ backgroundColor: colors.highlight });
  };

  const onPressOut = () => {
    pressableRef.current?.setNativeProps({ backgroundColor: colors.tertiary });
  };

  return (
    <Pressable
      ref={pressableRef}
      disabled={disabled}
      style={[styles.container, { backgroundColor: colors.tertiary }]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      {iconName ? (
        <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
          <Icon name={iconName} size={20} color={iconColor as string} />
        </View>
      ) : null}

      <View style={[styles.infoContainer, infoContainerStyle]}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: disabled ? colors.textDisabled : titleStyle === 'destructive' ? colors.red : colors.text },
            ]}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: disabled ? colors.textDisabled : colors.text }]}>{subtitle}</Text>
          ) : null}
        </View>

        {typeof toggled === 'boolean' ? (
          <Switch disabled={disabled} pointerEvents="none" value={toggled} onValueChange={onPress} />
        ) : null}
        {selected ? <Icon name="checkmark" size={12} color={colors.primary} /> : null}

        {hasArrow ? <Icon name="arrow-right" width={7} color={colors.greyLight} /> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    padding: 4,
    borderRadius: 7,
    marginRight: 15,
  },

  infoContainer: {
    flex: 1,
    paddingRight: 15,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 15,
  },
});
