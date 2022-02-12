import { applicationId } from 'expo-application';
import auth from '@react-native-firebase/auth';

import { logger } from '@/helpers';
import { InputStore, makeSimpleAutoObservable } from '@/stores';

export class EmailVm {
  private _email = new InputStore('pavlo.huk@icloud.com');

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get email(): InputStore {
    return this._email;
  }

  async sendEmail(): Promise<void> {
    try {
      if (!applicationId) {
        throw new Error('No applicationId found');
      }

      // Save the email for latter usage
      // await AsyncStorage.setItem('emailForSignIn', email);

      await auth().sendSignInLinkToEmail(this._email.value, {
        handleCodeInApp: true,
        url: 'https://go.ornuto.com/magic-link',
        iOS: {
          bundleId: applicationId,
        },
        android: {
          installApp: true,
          packageName: applicationId,
        },
      });
    } catch (err) {
      logger.error(err);
    }
  }
}
