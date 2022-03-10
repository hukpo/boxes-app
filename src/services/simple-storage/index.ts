import { autoInjectable, singleton } from 'tsyringe';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Logger, logger } from '@/helpers';

type SimpleStorageKey = 'languageCode' | 'autoNightMode' | 'nightModeToggled';

@singleton()
@autoInjectable()
export class SimpleStorage {
  constructor(private _logger: Logger) {
    _logger.setNamespace('Storage:');
  }

  async get<T extends string>(key: SimpleStorageKey): Promise<T | null> {
    try {
      return (await AsyncStorage.getItem(key)) as T | null;
    } catch (err) {
      logger.error(err);

      return null;
    }
  }

  async getObject<T extends SimpleStorageKey>(keys: T[]): Promise<Record<T, string> | undefined> {
    try {
      const results = await AsyncStorage.multiGet(keys);

      return results?.reduce((prev, [key, value]) => {
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

      this._logger.debug(`"${key}" changed!`);
    } catch (err) {
      logger.error(err);
    }
  }
}
