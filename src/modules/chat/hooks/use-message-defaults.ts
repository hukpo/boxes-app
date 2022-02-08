import { container } from 'tsyringe';
import { useTranslation } from 'react-i18next';

import { UIStore } from '@/stores';
import { getHHMM } from '@/helpers';
import { PopupMenuItem } from '@/ui-kit';
import { MessagesStore } from '../stores';
import { ChatMessageObject } from '../models';

type PopupMenuItems = {
  delete: PopupMenuItem;
};

export const useMessageDefaults = (message: ChatMessageObject): { popupMenuItems: PopupMenuItems; time: string } => {
  const { t } = useTranslation();
  const uiStore = container.resolve(UIStore);
  const messagesStore = container.resolve(MessagesStore);

  const popupMenuItems: PopupMenuItems = {
    delete: {
      title: t('delete'),
      destructive: true,
      systemIcon: { name: 'trash' },
      onPress: () => messagesStore.delete(message),
    },
  };

  return {
    popupMenuItems,
    time: getHHMM(message.createdAt, uiStore.is24HourClock),
  };
};
