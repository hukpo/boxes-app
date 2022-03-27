import { runInAction } from 'mobx';
import { autoInjectable } from 'tsyringe';
import { Asset } from 'expo-media-library';

import { MessagesDB } from '../../db';
import { Box, Gallery } from '@/modules';
import { ImageUploadStatus } from '@/types';
import { logger, uploadImage } from '@/helpers';
import { makeSimpleAutoObservable } from '@/stores';
import { ChatMessageText, ChatMessageType, ChatMessageImage, ChatMessageObject } from '../../types';

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

  get editMessagePreviewText(): string | undefined {
    return this._editMessage?.text.replace(/\n/g, ' ');
  }
  get editMessageText(): string | undefined {
    return this._editMessage?.text;
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

  cancelEdit(): void {
    runInAction(() => (this._editMessage = null));
    this.setComposerText('');
  }

  openGallery(): void {
    this._gallery.open({
      selectAsset: this.selectAsset,
    });
  }

  async sendMessage(): Promise<void> {
    try {
      if (!this._parentId) {
        throw new Error('No parentId found');
      }

      const parsedComposerText = this._composerText.trim();

      if (this._editMessage) {
        if (parsedComposerText !== this._editMessage.text) {
          this._db.update(this._editMessage, {
            text: parsedComposerText,
          });
        }

        runInAction(() => (this._editMessage = null));
      } else {
        this._db.save<ChatMessageText>({
          parentId: this._parentId,
          text: parsedComposerText,
          type: ChatMessageType.TEXT,
        });
      }

      this.setComposerText('');
    } catch (err) {
      logger.error(err);
    }
  }

  public async selectAsset(asset: Asset): Promise<void> {
    try {
      if (!this._parentId) {
        throw new Error('No parentId found');
      }
      const newMessage = this._db.save<ChatMessageImage>({
        aspectRatio: asset.width / asset.height,
        parentId: this._parentId,
        type: ChatMessageType.IMAGE,
        status: ImageUploadStatus.IN_PROGRESS,
      });

      const { key } = await uploadImage(asset.uri);

      this._db.update(newMessage, {
        key,
        status: ImageUploadStatus.DONE,
      });
    } catch (err) {
      logger.error(err);
    }
  }
}
