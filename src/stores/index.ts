import { container } from 'tsyringe';
import React, { createContext } from 'react';

import { AppStore } from './app.store';
import { ThemeStore } from './theme.store';
import { UIStore } from './ui.store';

export class RootStore {
  appStore = container.resolve(AppStore);

  themeStore = container.resolve(ThemeStore);

  uiStore = container.resolve(UIStore);
}

export const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = <T extends any = RootStore>(selector?: (root: RootStore) => T): T => {
  const store = React.useContext(RootStoreContext);

  if (!store) {
    throw new Error('useStores must be used within a StoreProvider.');
  }

  if (!selector) {
    selector = () => store as T;
  }

  return selector(store);
};

export { UIStore } from './ui.store';
export { AppStore } from './app.store';
export { ThemeStore } from './theme.store';
export { InputStore } from './input.store';
export { makeSimpleAutoObservable } from './utils';
