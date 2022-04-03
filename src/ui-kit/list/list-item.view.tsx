import React, { FC } from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Switch,
  View,
  ViewStyle,
  Pressable,
  TextInputProps,
  TextInput,
} from 'react-native';

import { useValue } from '@/hooks';
import { useTheme } from '@/themes';
import { Icon, IconProps, Text } from '@/ui-kit';

export type ListItemProps = {
  title?: string;
  subtitle?: string;
  onPress?: () => void;

  inputProps?: TextInputProps;

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
  inputProps,
  titleStyle,
  iconColor = '#fff',
  iconBackground = 'transparent',
  onPress,
}) => {
  const { colors } = useTheme();
  const isPressed = useValue(false);

  const onPressInOut = (): void => {
    if (!disabled && onPress) {
      isPressed.toggle();
    }
  };

  return (
    <Pressable
      disabled={disabled}
      style={[
        styles.container,
        { backgroundColor: colors.tertiary },
        isPressed() && { backgroundColor: colors.highlight },
      ]}
      onPressIn={onPressInOut}
      onPressOut={onPressInOut}
      onPress={onPress}>
      {iconName ? (
        <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
          <Icon name={iconName} size={20} color={iconColor as string} />
        </View>
      ) : null}

      <View style={[styles.infoContainer, infoContainerStyle]}>
        <View style={styles.textContainer}>
          {inputProps ? (
            <TextInput
              {...inputProps}
              style={[styles.title, styles.input, { color: colors.text }, inputProps.style]}
            />
          ) : null}

          {title ? (
            <Text
              style={[
                styles.title,
                {
                  color: disabled
                    ? colors.textDisabled
                    : titleStyle === 'destructive'
                    ? colors.red
                    : colors.text,
                },
              ]}>
              {title}
            </Text>
          ) : null}

          {subtitle ? (
            <Text
              style={[styles.subtitle, { color: disabled ? colors.textDisabled : colors.text }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {typeof toggled === 'boolean' ? (
          <Switch
            disabled={disabled}
            pointerEvents="none"
            value={toggled}
            onValueChange={onPress}
          />
        ) : null}
        {selected ? <Icon name="checkmark" size={12} color={colors.primary} /> : null}

        {hasArrow ? <Icon name="arrow.right" width={7} color={colors.greyLight} /> : null}
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
    flexGrow: 1,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 15,
  },
  input: {
    flexGrow: 1,
  },
});
