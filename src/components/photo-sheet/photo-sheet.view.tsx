import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionSheet, ActionSheetRef } from '@/ui-kit';

type PhotoSheetProps = {
  selected: boolean;
  onGalleryPress: () => void;
  onRemovePress: () => void;
};

export const PhotoSheet = forwardRef<ActionSheetRef, PhotoSheetProps>(
  ({ selected, onGalleryPress, onRemovePress }, ref) => {
    const { t } = useTranslation(['gallery']);

    return (
      <ActionSheet.Container ref={ref}>
        <ActionSheet.Button title={t('openGallery')} onPress={onGalleryPress} />
        {selected ? <ActionSheet.Button type="destructive" title={t('removePhoto')} onPress={onRemovePress} /> : null}
      </ActionSheet.Container>
    );
  },
);
