// @material-ui core
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

// local
import SEO from '../components/seo';
import LoginForm from '../components/login/login_form';

// utils
import { Emoji } from '../utils/form_helper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'url(assets/images/login_image.png)',
    backgroundSize: '75vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(17, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <>
      {/* WAJIB INI ADA NGEHE */}
      <CssBaseline />
      {/* MANJA AJG MUI */}

      <SEO title="Login" />
      <Grid container className={classes.root}>
        <Grid item xs={false} md={7} className={classes.image} />
        <Grid item xs={12} md={5}>
          <div className={classes.paper}>
            <img src="evopedia_logo.png" alt="Evopedia" width="200vw" />
            <Box mt={3} mb={3}>
              <Typography variant="h4" color="primary">
                <Emoji icon="🚀" />
                <b> Masuk</b>
              </Typography>
            </Box>
            <LoginForm />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
