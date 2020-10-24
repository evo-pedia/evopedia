// react
import { useState } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// utils
import { TextFieldWithErr } from '../../utils/form_helper';
import { reviewValidationSchema } from '../../utils/yup_validation';
import { postFetcher, getClientToken } from '../../utils/data_helper';

// lib
import { CHECK_USER, TRANSFER } from '../../lib/links';

// local
import Modal from '../modal';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  loading: {
    display: 'block',
    margin: '0 auto',
  },
  cancel: {
    color: theme.palette.warning.main,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function ReviewForm({
  negativeClick,
  positiveClick,
  handleRecipient,
  onError,
  type,
  total,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const initialValues = {
    username: '',
    password: '',
  };

  const handleUsernameCheck = async (username) => {
    const token = getClientToken();
    const struct = {
      username: username.toUpperCase(),
    };

    try {
      const postData = await postFetcher(CHECK_USER, struct, token);
      const { name: checkedName } = postData;

      setName(checkedName);
    } catch (e) {
      setName('Username tidak ada!');
    }
  };

  const handleModalOpen = (username) => {
    setOpen(true);
    handleUsernameCheck(username);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    handleModalClose();

    const { username, password } = data;
    const struct = {
      receiver: username.toUpperCase(),
      tipe: type,
      nominal: total,
      password,
    };

    const token = getClientToken();
    const postData = await postFetcher(TRANSFER, struct, token);

    setSubmitting(false);

    if (postData === 201) {
      handleRecipient(username.toUpperCase());
      positiveClick();
    }

    onError();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={reviewValidationSchema}>
      {({ values, dirty, isValid, isSubmitting }) => (
        <Form id="reviewForm" className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextFieldWithErr
                label="Username penerima"
                name="username"
                uppercased
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldWithErr
                label="Password anda"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {isSubmitting ? (
                <CircularProgress size="2rem" className={classes.loading} />
              ) : (
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={negativeClick}
                  fullWidth>
                  Kembali
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                disabled={!(dirty && isValid) || isSubmitting}
                onClick={() => handleModalOpen(values.username)}
                fullWidth>
                Transfer
              </Button>
            </Grid>
          </Grid>
          <Modal
            title={`Anda yakin ingin transfer ke ${values.username.toUpperCase()}?`}
            open={open}
            onClose={handleModalClose}>
            <DialogContentText>
              Aksi ini tidak dapat dibatalkan!
            </DialogContentText>
            <Divider className={classes.divider} />
            <Typography variant="overline" gutterBottom>
              Transfer ke
            </Typography>
            <Typography variant="h4">
              {name.length ? (
                name
              ) : (
                <CircularProgress size="2rem" className={classes.loading} />
              )}
            </Typography>
            <DialogActions>
              <Button
                type="button"
                onClick={handleModalClose}
                className={classes.cancel}>
                Batalkan
              </Button>
              <Button type="submit" color="primary" form="reviewForm">
                Transfer
              </Button>
            </DialogActions>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}

ReviewForm.propTypes = {
  negativeClick: PropTypes.func.isRequired,
  positiveClick: PropTypes.func.isRequired,
  handleRecipient: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
