import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { AuthStore } from '../../stores';
import { Navigation } from '@/navigation';
import { AppStore, InputStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class CodeVm {
  private _code = new InputStore('');

  constructor(private _authStore: AuthStore, private _appStore: AppStore, private _navigation: Navigation) {
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
      await this._appStore.initDB();

      this._navigation.popToTop();
      this._navigation.goBack();
    } catch (err) {
      logger.error(err);
    }
  }
}
