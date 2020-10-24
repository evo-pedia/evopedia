// react
import { useState } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// lib
import { ACTIVATION } from '../../lib/links';

// utils
import { TextFieldWithErr, CheckboxWithErr } from '../../utils/form_helper';
import { activationValidationSchema } from '../../utils/yup_validation';
import { postFetcher, getClientToken } from '../../utils/data_helper';

// local
import Modal from '../modal';

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    marginTop: theme.spacing(1),
  },
  cancel: {
    color: theme.palette.warning.main,
  },
}));

export default function ActivationForm({
  handleFormCompleted,
  handleSnackbarOpen,
  handlePoin,
  poin,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const initialValues = {
    poin,
    sk: false,
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);

    const { poin: newPoin } = data;
    const struct = {
      value: newPoin,
    };

    const token = getClientToken();
    const postData = await postFetcher(ACTIVATION, struct, token);

    setSubmitting(false);
    if (postData === 201) {
      handleFormCompleted();
      handlePoin(newPoin);
      handleModalClose();
      return;
    }

    handleSnackbarOpen();
    handleModalClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={activationValidationSchema}>
      {({ values, dirty, isValid, isSubmitting }) => (
        <>
          <Form id="activationForm" className={classes.form}>
            <Grid container spacing={2} direction="column">
              <Grid item xs>
                <CheckboxWithErr label="Saya setuju" name="sk" />
              </Grid>
              <Grid item xs>
                <Typography>
                  <b>Jumlah Aktivasi Poin Socialpreneur</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <TextFieldWithErr
                  label="Poin aktivasi"
                  name="poin"
                  type="number"
                />
              </Grid>
              <Grid item xs>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={!(dirty && isValid) || isSubmitting}
                  onClick={handleModalOpen}
                  fullWidth>
                  Aktivasi akun
                </Button>
                {isSubmitting && <LinearProgress />}
              </Grid>
            </Grid>
          </Form>
          <Modal
            title={`Apakah anda ingin aktivasi sebesar ${values.poin}?`}
            open={open}
            onClose={handleModalClose}>
            <DialogContentText>
              Dengan melakukan aktivasi, poin tidak dapat dikembalikan!
            </DialogContentText>
            <DialogActions>
              <Button
                type="button"
                onClick={handleModalClose}
                className={classes.cancel}>
                Batalkan
              </Button>
              <Button type="submit" color="primary" form="activationForm">
                Aktivasi
              </Button>
            </DialogActions>
          </Modal>
        </>
      )}
    </Formik>
  );
}

ActivationForm.propTypes = {
  handleFormCompleted: PropTypes.func.isRequired,
  handleSnackbarOpen: PropTypes.func.isRequired,
  handlePoin: PropTypes.func.isRequired,
  poin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
