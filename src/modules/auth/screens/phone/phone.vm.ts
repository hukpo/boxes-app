import { autoInjectable } from 'tsyringe';
import auth from '@react-native-firebase/auth';

import { logger } from '@/helpers';
import { AuthStore } from '../../stores';
import { Navigation } from '@/navigation';
import { AuthMainScreen } from '../../navigation';
import { InputStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class PhoneVm {
  private _phoneCode = new InputStore('+380');
  private _phoneNumber = new InputStore('');

  constructor(private _authStore?: AuthStore, private _navigation?: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get phoneCode(): InputStore {
    return this._phoneCode;
  }
  get phoneNumber(): InputStore {
    return this._phoneNumber;
  }

  get nextButtonDisabled(): boolean {
    return this.phoneNumber.value.length < 7;
  }

  async sendCode(): Promise<void> {
    try {
      const fullNumber = this._phoneCode.value + this._phoneNumber.value;

      const confirmation = await auth().signInWithPhoneNumber(fullNumber);

      this._authStore!.setConfirmation(confirmation);
      this._authStore!.setPhoneNumber(fullNumber);

      this._navigation!.navigate(AuthMainScreen.CODE);
    } catch (err) {
      logger.error(err);
    }
  }
}
