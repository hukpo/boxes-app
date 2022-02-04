import { container, singleton } from 'tsyringe';

@singleton()
export class SwipableRowsManager {
  private _refs = new Map<string, Function>();

  add = (id: string, closeHandler: () => void): void => {
    this._refs.set(id, closeHandler);
  };

  closeAll = (): void => {
    this._refs.forEach(v => v());

    this._refs.clear();
  };
}

export const useSwipableRows = (): SwipableRowsManager => {
  return container.resolve(SwipableRowsManager);
};
