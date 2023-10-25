import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
// @mui
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
// components
import Iconify from '@/components/iconify';
import { useChatCreateQuery } from '@/api/chats/useChatCreateQuery';
import { SimpleChatRoom } from '@/types/entity';
import { useLocales } from '@/locales';
import { EmojiPicker } from '@/components/emoji';
import { EmojiData } from '@/components/emoji/types';
import { useBoolean } from '@/hooks/use-boolean';
import { useSnackbar } from '@/components/snackbar';

// ----------------------------------------------------------------------

type Props = {
  chatRoom: SimpleChatRoom;
  disabled: boolean;
  setDispatch: Dispatch<SetStateAction<boolean>>;
};

export default function ChatMessageInput({
  chatRoom,
  disabled,
  setDispatch,
}: Props) {
  const { mutate, status } = useChatCreateQuery(chatRoom.chatRoomId);
  const [message, setMessage] = useState('');
  const { t } = useLocales();
  const emojiDialog = useBoolean();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [msgSub, setMsgSub] = useState({
    start: 0,
    end: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleEmoji = useCallback(
    (emoji: EmojiData) => {
      setMessage(
        (prev) =>
          `${
            prev.substring(0, msgSub.start) +
            emoji.native +
            prev.substring(msgSub.end)
          }`
      );
      if (inputRef.current) {
        
      }
      emojiDialog.onFalse();
    },
    [message, msgSub]
  );

  useEffect(() => {
    if (emojiDialog.value && inputRef.current) {
      inputRef.current.focus();
    }
  }, [emojiDialog.value]);

  const handleChangeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const emojiPickerOpen = () => {
    setMsgSub({
      start: inputRef.current?.selectionStart || 0,
      end: inputRef.current?.selectionEnd || 0,
    });
    emojiDialog.onTrue();
  };

  const handleSend = useCallback(async () => {
    if (!!message) {
      mutate({
        content: message,
      });
      setMessage('');
    }
  }, [message]);

  const handleSendMessage = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await handleSend();
      }
    },
    [message]
  );

  useEffect(() => {
    if (status === 'success') {
      setDispatch(true);
    }else if(status === 'error'){
      enqueueSnackbar({
        message: t('Failed to send message'),
        variant: 'error'
      })
    }
  }, [status]);

  return (
    <>
      <InputBase
        inputProps={{
          ref: inputRef,
        }}
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder={t('Type a message')}
        disabled={disabled}
        startAdornment={
          <IconButton onClick={emojiPickerOpen}>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleSend}>
              <Iconify icon="bi:send-fill" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />
      <EmojiPicker
        open={emojiDialog.value}
        onClose={emojiDialog.onFalse}
        onEmojiSelect={handleEmoji}
      />
    </>
  );
}
