import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  MenuAttributes,
  ContextMenuView,
  MenuActionConfig,
  OnPressMenuItemEvent,
} from 'react-native-ios-context-menu';

export type PopupMenuItem = {
  title: string;
  onPress: () => void;
  destructive?: boolean;
  /**
   * iOS SF Symbols icon
   *
   * @platform ios
   */
  systemIcon?: { name: string };
};

type PopupMenuProps = {
  title?: string;
  items: PopupMenuItem[];
  style?: StyleProp<ViewStyle>;
};

export const PopupMenu: FC<PopupMenuProps> = ({ children, style, title = '', items }) => {
  const menuItems = items.map<MenuActionConfig>((item, index) => {
    const menuAttributes: MenuAttributes[] = [];

    if (item.destructive) {
      menuAttributes.push('destructive');
    }

    const config: MenuActionConfig = {
      menuAttributes,
      actionKey: String(index),
      actionTitle: item.title,
      icon: item.systemIcon
        ? {
            type: 'IMAGE_SYSTEM',
            imageValue: { systemName: item.systemIcon.name },
          }
        : undefined,
    };

    return config;
  });

  const onPressMenuItem: OnPressMenuItemEvent = ({ nativeEvent: { actionKey } }) => {
    items[Number(actionKey)].onPress();
  };

  return (
    <ContextMenuView
      style={style}
      onPressMenuItem={onPressMenuItem}
      menuConfig={{ menuItems, menuTitle: title }}>
      {children}
    </ContextMenuView>
  );
};
