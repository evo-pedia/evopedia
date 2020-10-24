// react
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// lib
import { PROFILE_DATA } from '../../lib/links';

// utils
import { TextFieldWithErr } from '../../utils/form_helper';
import { channelDetailValidationSchema } from '../../utils/yup_validation';
import { postFetcher, getClientToken } from '../../utils/data_helper';

// local
import Modal from '../modal';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  cancel: {
    color: theme.palette.warning.main,
  },
}));

function checkData(data) {
  if (!data) return '';
  return data;
}

export default function DetailsForm({ profileLink, userEmail, channelName }) {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const initialValues = {
    email: checkData(userEmail),
    ytLink: checkData(profileLink),
    ytChan: checkData(channelName),
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const {
      email: email_channel,
      ytLink: link_profile_youtube,
      ytChan: nama_channel_youtube,
    } = data;
    const struct = {
      email_channel,
      link_profile_youtube,
      nama_channel_youtube,
    };

    const token = getClientToken();
    const postData = await postFetcher(PROFILE_DATA, struct, token);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    if (postData.message === 'sukses di update') {
      router.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={channelDetailValidationSchema}>
      {({ isSubmitting }) => (
        <>
          <Form id="chanForm" className={classes.form}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12} md>
                <TextFieldWithErr label="Email Akun" name="email" />
              </Grid>
              <Grid item xs={12} md>
                <TextFieldWithErr label="Link Channel" name="ytLink" />
              </Grid>
              <Grid item xs={12} md>
                <TextFieldWithErr label="Nama Channel" name="ytChan" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleModalOpen}
                  disabled={isSubmitting}
                  fullWidth>
                  Simpan
                </Button>
                {isSubmitting && <LinearProgress />}
              </Grid>
            </Grid>
          </Form>
          <Modal
            open={open}
            onClose={handleModalClose}
            title="Apakah anda yakin?">
            <DialogContentText>
              Aksi ini tidak dapat dikembalikan! Link dan nama channel tidak
              dapat dirubah kembali!
            </DialogContentText>
            <DialogActions>
              <Button
                type="button"
                onClick={handleModalClose}
                className={classes.cancel}>
                Batalkan
              </Button>
              <Button
                type="submit"
                form="chanForm"
                color="primary"
                onClick={handleModalClose}>
                Simpan
              </Button>
            </DialogActions>
          </Modal>
        </>
      )}
    </Formik>
  );
}

DetailsForm.defaultProps = {
  profileLink: null,
  channelName: null,
  userEmail: null,
};

DetailsForm.propTypes = {
  profileLink: PropTypes.string,
  channelName: PropTypes.string,
  userEmail: PropTypes.string,
};
