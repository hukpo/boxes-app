import { autoInjectable } from 'tsyringe';

import { BoxesDb } from '../../db';
import { Navigation } from '@/navigation';
import { Box, BoxObject } from '../../types';
import { logger, uploadImage } from '@/helpers';
import { InputStore, PhotoSelectStore, makeSimpleAutoObservable } from '@/stores';

type Changes = {
  name?: string;
  photo?: { uri: string; aspectRatio: number } | { isRemoved: boolean };
};

@autoInjectable()
export class EditVm {
  private _name = new InputStore();
  private _photo = new PhotoSelectStore();
  private _parent: BoxObject | null = null;

  constructor(private _db?: BoxesDb, private _navigation?: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get photo(): PhotoSelectStore {
    return this._photo;
  }

  get name(): InputStore {
    return this._name;
  }

  get parent(): BoxObject | null {
    return this._parent;
  }
  setParent(parentId: Box['parentId']): void {
    const parent = this._db?.getById(parentId);

    if (parent) {
      this._parent = parent;
      this._name.setValue(parent.name);

      if (parent.key && parent.aspectRatio) {
        this._photo.setSelected({
          source: { uriKey: parent.key },
          aspectRatio: parent.aspectRatio,
        });
      }
    }
  }

  get changes(): Changes {
    const changes: Changes = {};
    const trimmedName = this._name.value.trim();

    if (trimmedName !== this._parent?.name) {
      changes.name = trimmedName;
    }

    const parentKey = this._parent?.key;
    const source = this._photo.selected?.source;
    const aspectRatio = this._photo.selected?.aspectRatio;

    if (parentKey && !source) {
      changes.photo = { isRemoved: true };
    }

    if (aspectRatio && source && 'uri' in source) {
      changes.photo = { uri: source.uri, aspectRatio };
    }

    return changes;
  }
  async saveChanges(): Promise<void> {
    try {
      if (!this._parent) {
        throw new Error('No parent found');
      }

      const { name, photo } = this.changes;
      const updateObj: Partial<BoxObject> = {};

      if (name) {
        updateObj.name = name;
      }

      if (photo) {
        if ('uri' in photo) {
          const { key } = await uploadImage(photo.uri);
          updateObj.key = key;
          updateObj.aspectRatio = photo.aspectRatio;
        } else {
          updateObj.key = undefined;
          updateObj.aspectRatio = undefined;
        }
      }

      this._db?.update(this._parent, updateObj);
      this._navigation?.goBack();
    } catch (err) {
      logger.error(err);
    }
  }
}
