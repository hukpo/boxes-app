import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import { config } from '@config';

class Logger {
  constructor(
    private _logger: {
      info: Function;
      error: Function;
    },
  ) {}

  info(message: string): void {
    const date = new Date().toISOString();

    this._logger.info(`${date} - ${message}`);
    crashlytics().log(message);
  }

  log(...params: any[]): void {
    this._logger.info(...params);
  }

  error(error: unknown): void {
    if (error instanceof Error) {
      this._logger?.error(error);
      crashlytics().recordError(error);
    } else if (typeof error === 'string') {
      this.error(new Error(error));
    } else if (typeof error === 'object') {
      this.error(new Error(JSON.stringify(error)));
    }
  }

  setUserId(userId: string): void {
    this.log(`userId: ${userId}`);
    crashlytics().setUserId(userId);
  }

  logEvent(eventName: string, params: object = {}): void {
    try {
      analytics().logEvent(eventName, params);
    } catch (err) {
      this.error(err);
    }
  }
}

if (config.ENVIRONMENT === 'prod') {
  console.log = () => null;
  console.error = () => null;
}

export const logger = new Logger(config.ENVIRONMENT === 'prod' ? { info: () => null, error: () => null } : console);
