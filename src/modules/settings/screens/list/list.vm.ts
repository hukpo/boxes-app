import { Auth } from 'aws-amplify';
import { autoInjectable } from 'tsyringe';

import { Navigation } from '@navigation';
import { makeSimpleAutoObservable } from '@stores';
import { SettingsMainScreen } from '../../navigation';

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
    Auth.signOut();
  }
}
