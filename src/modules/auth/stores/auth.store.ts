import { singleton } from 'tsyringe';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { makeSimpleAutoObservable } from '@/stores';

@singleton()
export class AuthStore {
  private _phoneNumber = '';
  private _confirmation: FirebaseAuthTypes.ConfirmationResult | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }
  setPhoneNumber(value: string): void {
    this._phoneNumber = value;
  }

  get confirmation(): FirebaseAuthTypes.ConfirmationResult | null {
    return this._confirmation;
  }
  setConfirmation(value: FirebaseAuthTypes.ConfirmationResult): void {
    this._confirmation = value;
  }
}
