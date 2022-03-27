import { autoInjectable } from 'tsyringe';

import { RealmDb } from '@/db';
import { logger } from '@/helpers';
import { AuthStore } from '../../stores';
import { Navigation } from '@/navigation';
import { InputStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class CodeVm {
  private _code = new InputStore('');

  constructor(private _authStore: AuthStore, private _realmDB: RealmDb, private _navigation: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get code(): InputStore {
    return this._code;
  }

  get nextButtonDisabled(): boolean {
    return this._code.value.length < 6;
  }

  get phoneNumber(): string {
    return this._authStore.phoneNumber;
  }

  async confirmPhone(): Promise<void> {
    try {
      await this._authStore.confirmation?.confirm(this._code.value);
      await this._realmDB.init();

      this._navigation.popToTop();
      this._navigation.goBack();
    } catch (err) {
      logger.error(err);
    }
  }
}
