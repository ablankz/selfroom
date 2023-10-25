import { Dialog, useTheme } from '@mui/material';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { EMOJI_LOCALE } from '@/locales/emoji';
import { useLocales } from '@/locales';
import { EmojiData } from './types';

type Props = {
  open: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: EmojiData) => void;
};

export default function EmojiPicker({ open, onClose, onEmojiSelect }: Props) {
  const theme = useTheme();
  const { currentLang } = useLocales();

  return (
    <Dialog open={open} onClose={onClose}>
      <Picker
        theme={theme.palette.mode === 'light' ? 'light' : 'dark'}
        showPreview={false}
        onEmojiSelect={onEmojiSelect}
        data={data}
        style={{ color: 'lightgray', width: '100%' }}
        i18n={EMOJI_LOCALE[currentLang.value]}
      />
    </Dialog>
  );
}
