// @material-ui core
import Grid from '@material-ui/core/Grid';

// prop-types
import PropTypes from 'prop-types';

// local
import Wallet from './wallet';
import Members from './members';
import Convert from './convert';
import Video from './video';

export default function MiddlePanels({ dataProfile }) {
  const { wallet, members } = dataProfile;

  return (
    <Grid container spacing={2} justify="space-around" alignItems="center">
      <Grid item xs={12} md={12} lg={6}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={9}>
            <Wallet walletData={wallet} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Convert />
          </Grid>
          <Grid item xs={12} md={12}>
            <Members membersData={members} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Video url="https://www.youtube.com/watch?v=yVPLjU8RLK0&feature=youtu.be" />
      </Grid>
    </Grid>
  );
}

MiddlePanels.propTypes = {
  dataProfile: PropTypes.object.isRequired,
};
