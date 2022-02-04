import { singleton } from 'tsyringe';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logger } from '@helpers';

type SimpleStorageKey = 'languageCode' | 'autoNightMode' | 'nightModeToggled';

@singleton()
export class SimpleStorage {
  async get<T extends string>(key: SimpleStorageKey): Promise<T | null> {
    try {
      return (await AsyncStorage.getItem(key)) as T | null;
    } catch (err) {
      logger.error(err);

      return null;
    }
  }

  async getObject<T extends SimpleStorageKey>(keys: T[]): Promise<Record<T, string>> {
    try {
      const results = await AsyncStorage.multiGet(keys);

      return results.reduce((prev, [key, value]) => {
        if (value) {
          prev[key as T] = value;
        }

        return prev;
      }, {} as Record<T, string>);
    } catch (err) {
      logger.error(err);

      return {} as Record<T, string>;
    }
  }

  async set(key: SimpleStorageKey, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      logger.error(err);
    }
  }
}
