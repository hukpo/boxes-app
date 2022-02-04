import { autoInjectable } from 'tsyringe';

import { logger } from '@helpers';
import { Navigation } from '@navigation';
import { BoxesMainScreen } from '@modules';
import { makeSimpleAutoObservable } from '@stores';

@autoInjectable()
export class WelcomeVm {
  private _isLoading = false;

  constructor(private _navigation: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
  setIsLoading(value: boolean): void {
    this._isLoading = value;
  }

  async createAnonimous(): Promise<void> {
    try {
      this.setIsLoading(true);

      // await auth().signInAnonymously();

      this._navigation.navigate(BoxesMainScreen.LIST);
    } catch (err) {
      logger.error(err);
    } finally {
      this.setIsLoading(false);
    }
  }
}
