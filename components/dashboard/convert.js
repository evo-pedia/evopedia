// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

// local
import Modal from '../modal';
import DisplaySnack from '../snackbar';
import ConvertForm from '../convert/convert_form';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.convert.background,
    padding: theme.spacing(2),
    borderRadius: '40px 8px',
  },
}));

export default function Convert() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
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

  return (
    <>
      <Paper className={classes.paper} elevation={5}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs>
            <IconButton onClick={handleModalOpen}>
              <img src="assets/icons/convert_icon.svg" alt="Redeem dialog" />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography variant="overline">Convert</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Modal title="Konversi Komisi" open={open} onClose={handleModalClose}>
        <DialogContentText>
          Konversi hasil komisi yang telah didapatkan bersama EVOPEDIA.
        </DialogContentText>
        <ConvertForm
          negativeClick={handleModalClose}
          onError={handleSnackbarOpen}
        />
      </Modal>
      <DisplaySnack open={snack} onClose={handleSnackbarClose} severity="error">
        Bonus anda tidak cukup! / Anda sudah melebihi batas socialpreneur!
      </DisplaySnack>
    </>
  );
}
