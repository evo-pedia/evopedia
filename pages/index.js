// react
import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// @material-ui core
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// local
import SEO from '../components/seo';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  });

  return (
    <>
      <SEO title="Beranda" />
      <Box m={10}>
        <Typography variant="h2" gutterBottom>
          Redirecting...
        </Typography>
      </Box>
    </>
  );
}
