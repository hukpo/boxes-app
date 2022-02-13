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

  async main(): Promise<void> {
    try {
      logger.info('[AppStore] main');

      const { currentUser } = auth();

      if (currentUser) {
        const idToken = await currentUser.getIdToken();

        await this._realmDB.init(idToken);

        this._navigation.navigate(BoxesMainScreen.LIST);
      } else {
        this._navigation.navigate(AuthMainScreen.EMAIL);
      }
    } catch (err) {
      //TODO ???
      logger.error(err);
    } finally {
      runInAction(() => (this._isLoaded = true));
    }
  }
}
