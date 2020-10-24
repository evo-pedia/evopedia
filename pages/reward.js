// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// prop-types
import PropTypes from 'prop-types';

// locals
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import AllRanks from '../components/reward/all_ranks';
import PublisherDetails from '../components/reward/publisher_details';

// lib
import { PROFILE_DATA } from '../lib/links';

// utils
import { getFetcher, getCookiesData, getToken } from '../utils/data_helper';

export default function Reward({ profileData }) {
  return (
    <>
      <SEO title="Reward" />
      <Layout>
        <Typography variant="h3" gutterBottom>
          <b>Reward</b>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PublisherDetails {...profileData} />
          </Grid>
          <Grid item xs={12}>
            <AllRanks {...profileData} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // fetch data
  const token = getToken(ctx);
  const { evopediaUsername } = getCookiesData(ctx);
  const { socialpreneur, nama, publisher, publisher_name } = await getFetcher(
    PROFILE_DATA,
    token
  );

  const profileData = {
    name: nama,
    username: evopediaUsername,
    publisherName: publisher_name,
    publisherUname: publisher,
    socialpreneur,
  };

  return {
    props: {
      profileData,
    },
  };
}

Reward.propTypes = {
  profileData: PropTypes.object.isRequired,
};
