// next
import Head from 'next/head';

// prop-types
import PropTypes from 'prop-types';

export default function SEO({ title }) {
  const titleWithPrefix = `EVOPEDIA - ${title}`;
  const webDesc =
    'Sebuah aplikasi edukasi Google AdSense, Facebook Ads dan YouTube. Together we achieve more!';

  return (
    <Head>
      <title>{titleWithPrefix}</title>
      <meta name="description" content={webDesc} />
      <meta property="image" content="evopedia_logo.png" />
      <meta property="og:title" content={titleWithPrefix} />
      <meta property="og:description" content={webDesc} />
      <meta property="og:image" content="evopedia_logo.png" />
      <meta property="og:type" content="website" />
      <meta property="twitter:title" content={titleWithPrefix} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="@evopedia" />
      <meta property="twitter:description" content={webDesc} />
      <meta property="twitter:image" content="evopedia_logo.png" />
    </Head>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
};
