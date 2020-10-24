// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// prop-types
import PropTypes from 'prop-types';

// local
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import ChannelDetails from '../components/channel/channel_details';
import VideoDetails from '../components/channel/video_details';

// lib
import { PROFILE_DATA } from '../lib/links';

// utils
import { getFetcher, getToken } from '../utils/data_helper';

export default function Channel({ isActivated, ...props }) {
  return (
    <>
      <SEO title="Channel" />
      <Layout>
        <Typography variant="h3" gutterBottom>
          <b>Channel</b>
        </Typography>
        <Grid container spacing={3} direction="column">
          <Grid item xs>
            {isActivated && <ChannelDetails {...props} />}
          </Grid>
          <Grid item xs>
            <VideoDetails isActivated={isActivated} {...props} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // fetch data
  const token = getToken(ctx);
  const getData = await getFetcher(PROFILE_DATA, token);
  const {
    socialpreneur,
    email_channel: userEmail,
    video_si_user: vidList,
    link_profile: profileLink,
    nama_channel: channelName,
  } = getData;

  let isActivated = false;
  let isProfileExists = true;
  let totalVideos = 0;

  if (profileLink || channelName) isProfileExists = true;
  if (socialpreneur !== 0) {
    isActivated = true;
    totalVideos = Math.round(socialpreneur / 10);
  }

  return {
    props: {
      isActivated,
      isProfileExists,
      totalVideos,
      profileLink,
      channelName,
      userEmail,
      vidList,
    },
  };
}

Channel.defaultProps = {
  isActivated: false,
  totalVideos: 0,
};

Channel.propTypes = {
  isActivated: PropTypes.bool,
  totalVideos: PropTypes.number,
};
