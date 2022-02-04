import Realm from 'realm';
import { useEffect, useReducer } from 'react';

export const useRealmListUpdate = <T extends Realm.Results<any>>(objects: T | null): void => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    objects?.addListener((_, { deletions, insertions }) => {
      if (deletions.length || insertions.length) {
        forceUpdate();
      }
    });

    return () => objects?.removeAllListeners();
  }, [objects]);
};

export const useRealmObjectUpdate = <T extends Realm.Object>(object: T): void => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    object.addListener((_, { changedProperties }) => {
      if (changedProperties.length) {
        forceUpdate();
      }
    });

    return () => object.removeAllListeners();
  }, [object]);
};
