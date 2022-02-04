import { runInAction } from 'mobx';
import { autoInjectable, singleton } from 'tsyringe';

import { RealmDB } from '@db';
import { logger } from '@helpers';
import { Navigation } from '@navigation';
import { BoxesMainScreen } from '@modules';
import { makeSimpleAutoObservable } from './utils';

@singleton()
@autoInjectable()
export class AppStore {
  private _isLoaded = false;

  constructor(private _navigation: Navigation, private _realmDB: RealmDB) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }

  async main(): Promise<void> {
    try {
      logger.info('[AppStore] main');

      await this._realmDB.init();

      this._navigation.navigate(BoxesMainScreen.LIST);
    } catch (err) {
      //TODO ???
      logger.error(err);
    } finally {
      runInAction(() => (this._isLoaded = true));
    }
  }
}
