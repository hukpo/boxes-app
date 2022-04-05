import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { List } from '@/ui-kit';
import { useTheme } from '@/themes';

type MessageToDoProps = {
  style?: StyleProp<ViewStyle>;
};

export const MessageToDo: FC<MessageToDoProps> = ({ style }) => {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <List.Container style={style}>
      {Array(10)
        .fill(null)
        .map((_, index) => {
          const renderIcon = () => {
            if (!isSelected) {
              return null;
            }

            return (
              <View
                style={[
                  styles.selectedIcon,
                  {
                    borderColor: colors.tertiary,
                    backgroundColor: colors.green,
                  },
                ]}
              />
            );
          };

          return (
            <List.Item
              hasArrow
              key={index}
              title="to-do item"
              onPress={() => setIsSelected(v => !v)}
              renderIcon={renderIcon}
              iconContainerStyle={[
                styles.iconContainer,
                { borderColor: isSelected ? colors.green : colors.greyDark },
              ]}
            />
          );
        })}

      <List.Item titleStyle="primary" title="Add task" iconName="plus" iconColor={colors.primary} />
    </List.Container>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 0,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 1000,
  },
  selectedIcon: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 1000,
  },
});
