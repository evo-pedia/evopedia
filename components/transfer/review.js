// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// local
import ReviewForm from './review_form';
import TransferDetails from './transfer_details';
import DisplaySnack from '../snackbar';
import Notes from '../notes';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
  },
}));

export default function Review({ ...props }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <Paper className={classes.paper} elevation={5}>
            <TransferDetails {...props} />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper} elevation={5}>
            <Typography variant="h5">
              <b>Konfirmasi</b>
            </Typography>
            <Notes>
              <Typography>
                Tolong masukan username penerima dan password Anda untuk
                konfirmasi. Aksi ini tidak dapat dikembalikan!
              </Typography>
            </Notes>
            <ReviewForm onError={handleSnackbarOpen} {...props} />
          </Paper>
        </Grid>
      </Grid>
      <DisplaySnack open={open} onClose={handleSnackbarClose} severity="error">
        Password salah! / Saldo anda tidak cukup! / Username tidak berada dalam
        grup anda!
      </DisplaySnack>
    </>
  );
}
