// @material-ui core
import Grid from '@material-ui/core/Grid';

// prop-types
import PropTypes from 'prop-types';

// locals
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import Banner from '../components/profile/banner';
import UserData from '../components/profile/user_data';
import PicturePanel from '../components/profile/picture_panel';
import Password from '../components/profile/password';

// lib
import { PROFILE_DATA } from '../lib/links';

// utils
import {
  getCookiesData,
  getFetcher,
  getToken,
  convertDate,
} from '../utils/data_helper';

export default function Profile({ profileData }) {
  return (
    <>
      <SEO title="Profile" />
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Banner />
          </Grid>
          <Grid item xs={12} md={5}>
            <PicturePanel {...profileData} />
            <Password />
          </Grid>
          <Grid item xs={12} md={7}>
            <UserData {...profileData} />
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
  const {
    email_user,
    phone,
    publisher,
    mentor,
    socialpreneur,
    waktu_bergabung,
    nama,
  } = await getFetcher(PROFILE_DATA, token);

  const profileData = {
    name: nama,
    username: evopediaUsername,
    joinDate: convertDate(waktu_bergabung),
    email: email_user,
    phone,
    publisher,
    mentor,
    socialpreneur,
  };

  return {
    props: {
      profileData,
    },
  };
}

Profile.propTypes = {
  profileData: PropTypes.object.isRequired,
};
