import { FC } from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type Screen<T> = {
  name: string;
  component: FC;
  options?: T;
  children?: string[];
};

type BaseConfig<T> = {
  parentOptions?: T;
  screens: Screen<T>[];
};

export type StackConfig = BaseConfig<NativeStackNavigationOptions>;
export type BottomTabConfig = BaseConfig<BottomTabNavigationOptions>;
