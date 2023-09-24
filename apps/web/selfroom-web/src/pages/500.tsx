import { Helmet } from 'react-helmet-async';
// sections
import { View500 } from '@/sections/error';
import { FallbackProps } from 'react-error-boundary';

// ----------------------------------------------------------------------

export default function Page500(props: FallbackProps) {
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error</title>
      </Helmet>

      <View500 {...props}/>
    </>
  );
}
