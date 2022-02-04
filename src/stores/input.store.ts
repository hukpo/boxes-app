import { makeAutoObservable } from 'mobx';

export class InputStore {
  private _value = '';

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get value(): string {
    return this._value;
  }

  setValue(value: string): void {
    this._value = value;
  }
}
