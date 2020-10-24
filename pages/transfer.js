// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// locals
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import TransferSteps from '../components/transfer/steps';

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

export default function Transfer() {
  const classes = useStyles();

  return (
    <>
      <SEO title="Transfer" />
      <Layout>
        <Typography variant="h3" gutterBottom>
          <b>Transfer</b>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TransferSteps />
          </Grid>
          <Grid item xs={false} md={6}>
            <img
              src="assets/images/transfer_image.png"
              alt="tf pv"
              width="500vw"
              className={classes.image}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
