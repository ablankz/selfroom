import { Helmet } from 'react-helmet-async';
// sections
import { View500Cover } from '@/sections/error'; 

// ----------------------------------------------------------------------

export default function Page500Cover() {
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error</title>
      </Helmet>

      <View500Cover/>
    </>
  );
}
