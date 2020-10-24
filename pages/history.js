// @material-ui core
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// locals
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import HistoryList from '../components/riwayat/list';

function getHistoryList() {
  const struct = [
    {
      id: 1,
      title: 'Transfer',
      desc: 'Riwayat transfer masuk dan keluar',
      type: 'transfer',
    },
    {
      id: 2,
      title: 'Komisi',
      desc: 'Riwayat komisi admin, publisher dan konversi',
      type: 'komisi',
    },
    {
      id: 3,
      title: 'Aktivasi',
      desc: 'Riwayat aktivasi anda',
      type: 'aktivasi',
    },
  ];

  return struct;
}

export default function History() {
  const contents = getHistoryList();
  return (
    <>
      <SEO title="History" />
      <Layout>
        <Typography variant="h3" gutterBottom>
          <b>Riwayat</b>
        </Typography>
        <Grid container spacing={2}>
          {contents.map(({ id, ...data }) => (
            <Grid key={id} item xs={12}>
              <HistoryList {...data} />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
}
