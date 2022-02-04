import { singleton } from 'tsyringe';
import remoteConfig, { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';

import { logger } from '@/helpers';

type Config = {};

@singleton()
export class RemoteConfig {
  private DEFAULT_VALUES: Config = {};

  private getValue<T extends keyof Config>(key: T, type: 'string' | 'number' | 'boolean' | 'json'): void {
    logger.info(`[RemoteConfig] trying to get value by key: ${key}, type: ${type}`);

    const value = remoteConfig().getValue(key);

    let parsedValue;

    switch (type) {
      case 'number': {
        parsedValue = value.asNumber();
        break;
      }
      case 'boolean': {
        parsedValue = value.asBoolean();
        break;
      }
      case 'string': {
        parsedValue = value.asString();
        break;
      }
      case 'json': {
        try {
          parsedValue = JSON.parse(value.asString());
        } catch {}
        break;
      }
    }

    return parsedValue as Config[T];
  }

  private decodeConfig(config: Config): FirebaseRemoteConfigTypes.ConfigDefaults {
    const decodedConfig: FirebaseRemoteConfigTypes.ConfigDefaults = {};

    Object.keys(config).forEach(key => {
      const value = config[key as keyof Config];

      if (typeof value === 'object') {
        try {
          decodedConfig[key] = JSON.stringify(value);
        } catch (err) {
          logger.error(err);
        }
      } else if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
        decodedConfig[key] = value;
      }
    });

    return decodedConfig;
  }

  async fetch(): Promise<void> {
    const decodedConfig = this.decodeConfig(this.DEFAULT_VALUES);

    await Promise.all([
      remoteConfig().setDefaults(decodedConfig),
      remoteConfig().setConfigSettings({
        fetchTimeMillis: 5000,
        minimumFetchIntervalMillis: __DEV__ ? 0 : 43200000,
      }),
    ]);

    const isFetched = await remoteConfig().fetchAndActivate();

    if (isFetched) {
      logger.info('[RemoteConfig] config fetched');
    } else {
      logger.info('[RemoteConfig] config not fetched');
    }
  }
}
