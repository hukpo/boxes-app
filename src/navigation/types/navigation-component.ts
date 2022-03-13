import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type NC = FC<ReturnType<typeof createNativeStackNavigator>>;

export type BNC = FC<ReturnType<typeof createBottomTabNavigator>>;
