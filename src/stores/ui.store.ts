import { singleton } from 'tsyringe';
import { addEventListener, uses24HourClock } from 'react-native-localize';

import { makeSimpleAutoObservable } from './utils';

@singleton()
export class UIStore {
  private _is24HourClock = false;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });

    this.updateLocalize();
    addEventListener('change', this.updateLocalize);
  }

  get is24HourClock(): boolean {
    return this._is24HourClock;
  }

  updateLocalize(): void {
    this._is24HourClock = uses24HourClock();
  }
}
