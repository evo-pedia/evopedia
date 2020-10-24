// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// local
import ActivationForm from './activation_form';
import FormSuccess from '../form_success';
import DisplaySnack from '../snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
}));

export default function ActivationDetails() {
  const classes = useStyles();

  const [completed, setCompleted] = useState(false);
  const [snack, setSnack] = useState(false);
  const [poin, setPoin] = useState('');

  const handleFormCompleted = () => {
    setCompleted(true);
  };

  const handlePoin = (newPoin) => {
    setPoin(newPoin);
  };

  const handleSnackbarOpen = () => {
    setSnack(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false);
  };

  const formProps = {
    handleFormCompleted,
    handlePoin,
    handleSnackbarOpen,
    poin,
  };

  return (
    <>
      <Paper elevation={5} className={classes.paper}>
        {!completed ? (
          <Grid container spacing={1} direction="column">
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                <b>Syarat & Ketentuan</b>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                Untuk melakukan aktivasi, dibutuhkan minimal 5 voucher dan 5
                peds poin. Jumlah poin aktivasi diambil secara otomatis dari
                voucher dan PED poin. Setelah mencentang persetujuan di bawah
                ini, anda dapat melakukan aktivasi.
              </Typography>
            </Grid>
            <Grid item xs>
              <ActivationForm {...formProps} />
            </Grid>
          </Grid>
        ) : (
          <FormSuccess>
            <Typography>
              Anda telah melakkukan aktivasi sebesar
              <b>{` ${poin} `}</b>
              poin
            </Typography>
          </FormSuccess>
        )}
      </Paper>
      <DisplaySnack open={snack} onClose={handleSnackbarClose} severity="error">
        Saldo tidak cukup!
      </DisplaySnack>
    </>
  );
}
