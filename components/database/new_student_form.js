// react
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// utils
import {
  TextFieldWithErr,
  RadioWithErr,
  CheckboxWithErr,
} from '../../utils/form_helper';

import { newStudentFormValidationSchema } from '../../utils/yup_validation';
import { postFetcher, getClientToken } from '../../utils/data_helper';

// lib
import { REGISTER } from '../../lib/links';

// local
import Modal from '../modal';
import DisplaySnack from '../snackbar';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  cancel: {
    color: theme.palette.warning.main,
  },
  position: {
    display: 'block',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

function getStatus(status) {
  if (status === 'punya anak kiri brok') return '0';
  if (status === 'punya anak kanan brok') return '1';
  return '';
}

function getFormInputContents(type) {
  const struct = [
    {
      id: 1,
      md: 12,
      label: 'NIK / Passport',
      name: 'idNumber',
    },
    {
      id: 2,
      md: 6,
      label: 'Name',
      name: 'name',
    },
    {
      id: 3,
      md: 6,
      label: 'Phone',
      name: 'phone',
    },
    {
      id: 4,
      md: 12,
      label: 'Mentor',
      name: 'mentor',
      disabled: type === "luar" ? false : true,
      topDivider: true,
      uppercased: true,

    },
    ...type === "luar" ? [{
      id: 9,
      md: 12,
      label: 'Publisher',
      name: "publisher",
      disable: false,
      uppercased: true,
    } ]: [],
    {
      id: 5,
      md: 7,
      label: 'Email',
      name: 'email',
    },
    {
      id: 6,
      md: 5,
      label: 'Username',
      name: 'username',
      uppercased: true,
    },
    {
      id: 7,
      md: 6,
      label: 'Password',
      name: 'password',
      type: 'password',
    },
    {
      id: 8,
      md: 6,
      label: 'Confirm Password',
      name: 'passwordConfirm',
      type: 'password',
    },
  ];

  return struct;
}

function RegisterFormInput({ md, topDivider, className, ...props }) {
  return (
    <Grid item xs={12} md={md}>
      {topDivider && <Divider className={className} />}
      <TextFieldWithErr {...props} />
    </Grid>
  );
}

RegisterFormInput.defaultProps = {
  topDivider: false,
};

RegisterFormInput.propTypes = {
  md: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  topDivider: PropTypes.bool,
};

function RegisterFormPosition({ className, status }) {
  return (
    <>
      <Grid item xs={12} md={12}>
        <Typography variant="overline" className={className} gutterBottom>
          Position
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <RadioWithErr
          label="A Class"
          name="position"
          value="1"
          type="radio"
          disabled={getStatus(status) === '0'}
        />
      </Grid>
      <Grid item xs={6}>
        <RadioWithErr
          label="B Class"
          name="position"
          value="0"
          type="radio"
          disabled={getStatus(status) === '1'}
        />
      </Grid>
    </>
  );
}

RegisterFormPosition.propTypes = {
  className: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default function NewStudentForm({ negativeClick, mentor, status, type }) {
  const classes = useStyles();
  const router = useRouter();
  const contents = getFormInputContents(type);

  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [message, setMessage] = useState();

  const initialValues = {
    idNumber: '',
    name: '',
    phone: '',
    mentor,
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    position: getStatus(status),
    sk: false,
    publisher: ''
  };

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
    if (reason === 'clickaway') return;
    setSnack(false);
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const { idNumber, name, phone, email, username, password, position, publisher, mentor } = data;
    const struct = {
      id_number: idNumber,
      name,
      phone,
      email,
      parent: mentor,
      username: username.toUpperCase(),
      password,
      position,
      publisher: type === "luar" ? publisher.toUpperCase() : null
    };

    const token = getClientToken();
    const postData = await postFetcher(REGISTER, struct, token);

    setSubmitting(false);

    if(postData.id_number !== undefined) {
      setMessage("NIK SUDAH TERDAFTAR");
    }

    if(postData.message !== undefined) {
      setMessage(postData.message);
    }

    if (postData === 201) {
      negativeClick();
      router.reload();
    }

    handleSnackbarOpen();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={newStudentFormValidationSchema}>
        {({ values, isSubmitting }) => (
          <>
            {/* TODO: REFACTOR THIS SHIT! */}
            <Form id="newStudentForm" className={classes.form}>
              <Grid container spacing={1}>
                {contents.map(({ id, ...data }) => (
                  <RegisterFormInput
                    key={id}
                    className={classes.divider}
                    {...data}
                  />
                ))}
                <RegisterFormPosition
                  className={classes.position}
                  status={status}
                />
                <Grid item xs={12} md={12}>
                  <Divider className={classes.divider} />
                  <CheckboxWithErr
                    label="Saya menyetujui syarat dan ketentuan yang berlaku."
                    name="sk"
                  />
                </Grid>
              </Grid>
              <DialogActions>
                {isSubmitting ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <Button
                    type="button"
                    onClick={negativeClick}
                    className={classes.cancel}>
                    Batalkan
                  </Button>
                )}
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={handleModalOpen}
                  disabled={isSubmitting}>
                  Tambah
                </Button>
              </DialogActions>
            </Form>
            <Modal
              open={open}
              onClose={handleModalClose}
              title={`Anda yakin ingin menambahkan follower ${values.username.toUpperCase()}?`}>
              <DialogContentText>
                Data tidak dapat diubah lagi, apakah anda yakin ?
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
                  color="primary"
                  form="newStudentForm"
                  onClick={handleModalClose}
                  disabled={isSubmitting}>
                  Tambah
                </Button>
              </DialogActions>
            </Modal>
          </>
        )}
      </Formik>
      <DisplaySnack open={snack} onClose={handleSnackbarClose} severity="error">
        {message}
      </DisplaySnack>
    </>
  );
}

NewStudentForm.propTypes = {
  negativeClick: PropTypes.func.isRequired,
  mentor: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
