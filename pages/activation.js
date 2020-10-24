// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// local
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import ActivationDetails from '../components/activation/details';

const useStyles = makeStyles((theme) => ({
  image: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
    },
  },
}));

export default function Activation() {
  const classes = useStyles();

  return (
    <>
      <SEO title="Activation" />
      <Layout>
        <Typography variant="h3" gutterBottom>
          <b>Aktivasi</b>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ActivationDetails />
          </Grid>
          <Grid item xs={false} md={6}>
            <img
              src="assets/images/actv_image.png"
              alt="actv"
              width="400vw"
              className={classes.image}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
