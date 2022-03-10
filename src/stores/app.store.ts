import { runInAction } from 'mobx';
import auth from '@react-native-firebase/auth';
import { autoInjectable, singleton } from 'tsyringe';

import { RealmDB } from '@/db';
import { logger } from '@/helpers';
import { Navigation } from '@/navigation';
import { AuthMainScreen } from '@/modules';
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

  get isAuthorized(): boolean {
    return !!auth().currentUser;
  }

  async main(): Promise<void> {
    try {
      logger.info('[AppStore] main');

      if (!this.isAuthorized) {
        return this._navigation.navigate(AuthMainScreen.PHONE);
      }

      await this._realmDB.init();
    } catch (err) {
      //TODO ???
      logger.error(err);
    } finally {
      runInAction(() => (this._isLoaded = true));
    }
  }
}
