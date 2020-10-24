// @material-ui core
import Grid from '@material-ui/core/Grid';

// prop-types
import PropTypes from 'prop-types';

// locals
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import TopPanels from '../components/dashboard/top_panels';
import MiddlePanels from '../components/dashboard/middle_panels';
import BottomPanels from '../components/dashboard/bottom_panels';

// lib
import {
  PUBLISHER,
  ADVERTISING,
  DEVELOPMENT,
  EXCEL,
  MAJESTY,
  ADS,
  PEDS,
  VOUCHER,
  PROFILE_DATA,
  CLASSA,
  CLASSB,
  REFERRAL,
} from '../lib/links';

// utils
import { getFetcher, getToken, getCookiesData } from '../utils/data_helper';

export default function Dashboard({ dataKomisi, dataProfile }) {
  return (
    <>
      <SEO title="Dashboard" />
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopPanels dataKomisi={dataKomisi} />
          </Grid>
          <Grid item xs={12}>
            <MiddlePanels dataProfile={dataProfile} />
          </Grid>
          <Grid item xs={12}>
            <BottomPanels />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // fetch data
  // token
  const token = getToken(ctx);
  const { evopediaRole: role } = getCookiesData(ctx);

  // top panels
  const publisher = await getFetcher(PUBLISHER, token);
  const development = await getFetcher(DEVELOPMENT, token);
  const advertising = await getFetcher(ADVERTISING, token);

  let excel = null;
  let majesty = null;

  if (role === 'MAJESTY') majesty = await getFetcher(MAJESTY, token);
  if (role === 'EXECUTIVE CORE LEADER') excel = await getFetcher(EXCEL, token);

  // middle panels
  const ads = await getFetcher(ADS, token);
  const peds = await getFetcher(PEDS, token);
  const voucher = await getFetcher(VOUCHER, token);
  const { socialpreneur } = await getFetcher(PROFILE_DATA, token);
  const classA = await getFetcher(CLASSA, token);
  const classB = await getFetcher(CLASSB, token);
  const referral = await getFetcher(REFERRAL, token);

  // render data
  // top panels
  const dataKomisi = {
    publisher,
    development,
    advertising,
    role,
    excel,
    majesty,
  };

  // middle panels
  const dataProfile = {
    wallet: {
      ads,
      peds,
      voucher,
    },
    members: {
      socialpreneur,
      classA,
      classB,
      referral,
    },
  };

  return {
    props: {
      dataKomisi,
      dataProfile,
    },
  };
}

Dashboard.propTypes = {
  dataKomisi: PropTypes.object.isRequired,
  dataProfile: PropTypes.object.isRequired,
};
