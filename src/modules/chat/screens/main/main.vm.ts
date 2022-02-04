import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { autoInjectable } from 'tsyringe';
import { Asset } from 'expo-media-library';
import { Storage } from '@aws-amplify/storage';

import { logger } from '@/helpers';
import { Gallery } from '@/modules';
import { MessagesDB } from '../../db';
import { makeSimpleAutoObservable } from '@/stores';
import {
  ChatMessage,
  ChatMessages,
  ChatMessageText,
  ChatMessageType,
  ChatMessageImage,
  ChatMessageImageUploadStatus,
} from '../../models';

@autoInjectable()
export class MainVm {
  private _composerText = '';
  private _messages: ChatMessages | null = null;
  private _parentId: ChatMessage['parentId'] | null = null;

  constructor(private _db: MessagesDB, private _gallery: Gallery) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get messages(): ChatMessages | null {
    return this._messages;
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

  setParentId(value: ChatMessage['parentId']): void {
    this._parentId = value;
  }

  async getMessages(): Promise<void> {
    try {
      if (!this._parentId) {
        throw new Error('No parentId found');
      }

      logger.info(`Trying to get Messages, parentId: ${this._parentId}`);

      const messages = await this._db.getByParentId(this._parentId);

      runInAction(() => (this._messages = messages));
    } catch (err) {
      logger.error(err);
    }
  }

  async sendMessage(): Promise<void> {
    try {
      if (!this._parentId) {
        throw new Error('No parentId found');
      }

      await this._db.save<ChatMessageText>({
        parentId: this._parentId,
        text: this._composerText.trim(),
        type: ChatMessageType.TEXT,
        createdAt: new Date(),
      });

      this.setComposerText('');
    } catch (err) {
      logger.error(err);
    }
  }

  openGallery(): void {
    this._gallery.open({
      selectAssets: this.selectAssets,
    });
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
          createdAt: new Date(),
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
