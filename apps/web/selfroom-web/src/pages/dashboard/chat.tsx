import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ChatView } from '@/sections/dashboard/chat/view';

// ----------------------------------------------------------------------

export default function ChatPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Application')}: {t('Chat')}</title>
      </Helmet>

      <ChatView />
    </>
  );
}
