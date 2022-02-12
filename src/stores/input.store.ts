import { makeAutoObservable } from 'mobx';

export class InputStore {
  private _value: string;

  constructor(defaultValue = '') {
    this._value = defaultValue;

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get value(): string {
    return this._value;
  }

  setValue(value: string): void {
    this._value = value;
  }
}
