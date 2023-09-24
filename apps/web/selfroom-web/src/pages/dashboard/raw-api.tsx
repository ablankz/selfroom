import { Helmet } from 'react-helmet-async';
// sections
import { RawApiView } from '@/sections/dashboard/raw-api/view';

// ----------------------------------------------------------------------

export default function RawApiPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: RawApi</title>
      </Helmet>

      <RawApiView />
    </>
  );
}
