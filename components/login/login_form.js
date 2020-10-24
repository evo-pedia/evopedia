// react
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// @material-ui core
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// nookies
import { setCookie } from 'nookies';

// local
import DisplaySnack from '../snackbar';

// lib
import { LOGIN } from '../../lib/links';

// utils
import { TextFieldWithErr } from '../../utils/form_helper';
import { postFetcher, hashToken } from '../../utils/data_helper';
import { loginValidationSchema } from '../../utils/yup_validation';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '80%', // buat ie titit
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // values
    const { username, password } = values;
    const struct = {
      username: username.toUpperCase(),
      password,
    };

    // login
    const fetchStruct = await postFetcher(LOGIN, struct);
    const { token, username: loginUsername, role } = fetchStruct;

    if (fetchStruct === 'Akun Anda Belum Di Aktivasi') {
      setMessage("Akun anda tersuspend! \n Silahkan hubungi admin.");
      handleSnackbarOpen();
      return;
    }

    if (token) {
      // set cokil
      const hashedToken = hashToken(token);
      const cokilOptions = {
        maxAge: 60 * 60 * 24 * 7,
      };

      setCookie(null, 'evopediaLoginSecure', hashedToken, cokilOptions);
      setCookie(null, 'evopediaRole', role, cokilOptions);
      setCookie(null, 'evopediaUsername', loginUsername, cokilOptions);
      setSubmitting(false);

      router.push('/dashboard');
      return;
    } 

    setMessage("Username / Password anda salah!");

    setSubmitting(false);
    handleSnackbarOpen();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}>
      {({ isSubmitting }) => (
        <>
          <Form className={classes.form}>
            <TextFieldWithErr label="Username" name="username" uppercased />
            <TextFieldWithErr
              label="Password"
              name="password"
              type="password"
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
              className={classes.button}
              fullWidth>
              Masuk
            </Button>
            {isSubmitting && <LinearProgress />}
          </Form>
          <DisplaySnack
            open={open}
            onClose={handleSnackbarClose}
            severity="error">
            {message}
          </DisplaySnack>
        </>
      )}
    </Formik>
  );
}
