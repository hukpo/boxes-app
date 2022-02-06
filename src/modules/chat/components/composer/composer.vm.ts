import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { autoInjectable } from 'tsyringe';
import { Asset } from 'expo-media-library';
import { Storage } from '@aws-amplify/storage';

import { logger } from '@/helpers';
import { MessagesDB } from '../../db';
import { Box, Gallery } from '@/modules';
import { makeSimpleAutoObservable } from '@/stores';
import {
  ChatMessageText,
  ChatMessageType,
  ChatMessageImage,
  ChatMessageObject,
  ChatMessageImageUploadStatus,
} from '../../models';

export type ComposerMethods = {
  focus(): void;
};

@autoInjectable()
export class ComposerVm {
  private _composerText = '';
  private _editMessage: ChatMessageObject<ChatMessageText> | null = null;

  constructor(
    private _parentId: Box['_id'],
    private _methods: ComposerMethods,
    private _db: MessagesDB,
    private _gallery: Gallery,
  ) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get sendButtonDisabled(): boolean {
    return !this._composerText.trim();
  }

  get composerText(): string {
    return this._composerText;
  }
  setComposerText(value: string): void {
    this._composerText = value;
  }

  editMessage(message: ChatMessageObject<ChatMessageText>): void {
    runInAction(() => (this._editMessage = message));
    this.setComposerText(message.text);
    this._methods.focus();
  }

  openGallery(): void {
    this._gallery.open({
      selectAssets: this.selectAssets,
    });
  }

  async sendMessage(): Promise<void> {
    try {
      if (!this._parentId) {
        throw new Error('No parentId found');
      }

      if (this._editMessage) {
        await this._db.update(this._editMessage, {
          text: this._composerText,
        });

        runInAction(() => (this._editMessage = null));
      } else {
        await this._db.save<ChatMessageText>({
          parentId: this._parentId,
          text: this._composerText.trim(),
          type: ChatMessageType.TEXT,
        });
      }

      this.setComposerText('');
    } catch (err) {
      logger.error(err);
    }
  }

  async selectAssets(assets: Asset[]): Promise<void> {
    const uploaders = assets.map(async asset => {
      try {
        if (!this._parentId) {
          throw new Error('No parentId found');
        }

        const newMessage = await this._db.save<ChatMessageImage>({
          aspectRatio: asset.width / asset.height,
          parentId: this._parentId,
          type: ChatMessageType.IMAGE,
          status: ChatMessageImageUploadStatus.IN_PROGRESS,
        });

        const response = await fetch(asset.uri);
        const blob = await response.blob();

        const { key } = await Storage.put(uuidv4(), blob);

        await this._db.update(newMessage, {
          key,
          status: ChatMessageImageUploadStatus.DONE,
        });
      } catch (err) {
        logger.error(err);
      }
    });

    await Promise.all(uploaders);
  }
}
