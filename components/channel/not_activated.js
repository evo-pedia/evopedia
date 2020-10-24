// @material-ui core
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
  grid: {
    padding: theme.spacing(5),
  },
}));

export default function NotActivated() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="h5">
        <b>Video Saya</b>
      </Typography>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.grid}>
        <Grid item xs>
          <img src="assets/images/not_actv.png" alt="nactv" width="250vw" />
        </Grid>
        <Grid item xs>
          <Typography variant="h5">
            <b>Anda Belum Aktivasi Socialpreneur</b>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography>
            Silahkan aktivasi terlebih dahulu untuk dapat memasukan link video
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
