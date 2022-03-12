import { autoInjectable } from 'tsyringe';
import auth from '@react-native-firebase/auth';

import { Navigation } from '@/navigation';
import { makeSimpleAutoObservable } from '@/stores';
import { SettingsMainScreen } from '../../navigation';
import { AuthMainScreen } from '@/modules/auth';

@autoInjectable()
export class ListVm {
  constructor(private _navigation: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  openAppearance(): void {
    this._navigation.navigate(SettingsMainScreen.APPEARANCE);
  }

  openLanguage(): void {
    this._navigation.navigate(SettingsMainScreen.LANGUAGE);
  }

  logOut(): void {
    auth().signOut();

    this._navigation.navigate(AuthMainScreen.PHONE);
  }
}
