import i18next from 'i18next';
import { runInAction } from 'mobx';

import { LanguageCode } from '@/locales';
import { makeSimpleAutoObservable } from '@/stores';

export class LanguageVm {
  private _languageCode = i18next.language as LanguageCode;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get languageCode(): LanguageCode | null {
    return this._languageCode;
  }

  async selectLanguage(code: LanguageCode): Promise<void> {
    i18next.changeLanguage(code);
    runInAction(() => (this._languageCode = code));
  }
}
