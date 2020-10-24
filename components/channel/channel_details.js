// next
import Link from 'next/link';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
  button: {
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default function ChannelDetails() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            Download apk terbaru
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link href="https://drive.google.com/file/d/1HWIf8EZEPzL2XxRtrufYTF1K9zGpJUpu/view?usp=sharing">
            <a target="_blank" className={classes.button}>
              <Button
                variant="contained"
                component="button"
                color="primary"
                className={classes.button}>
                Download APK beta ver. 2.0.4
              </Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}
