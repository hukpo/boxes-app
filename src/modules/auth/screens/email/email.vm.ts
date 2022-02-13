import auth from '@react-native-firebase/auth';

import { logger } from '@/helpers';
import { InputStore, makeSimpleAutoObservable } from '@/stores';

export class EmailVm {
  private _phoneNumber = new InputStore('+380664223837');

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get phoneNumber(): InputStore {
    return this._phoneNumber;
  }

  async sendEmail(): Promise<void> {
    try {
      const confirmation = await auth().signInWithPhoneNumber(this._phoneNumber.value);

      const res = await confirmation.confirm('111111');

      console.log(JSON.stringify(res, null, 2));
    } catch (err) {
      logger.error(err);
    }
  }
}
