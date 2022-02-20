import { runInAction } from 'mobx';
import auth from '@react-native-firebase/auth';
import { autoInjectable, singleton } from 'tsyringe';

import { RealmDB } from '@/db';
import { logger } from '@/helpers';
import { Navigation } from '@/navigation';
import { AuthMainScreen, BoxesMainScreen } from '@/modules';
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

      await this.initDB();

      this._navigation.navigate(BoxesMainScreen.LIST);
    } catch (err) {
      //TODO ???
      logger.error(err);
    } finally {
      runInAction(() => (this._isLoaded = true));
    }
  }

  async initDB(): Promise<void> {
    const { currentUser } = auth();

    if (!currentUser) {
      throw new Error('No current user found');
    }

    const idToken = await currentUser.getIdToken();

    await this._realmDB.init(idToken);
  }
}
