// react
import { useState } from 'react';
// next
import { useRouter } from 'next/router';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// local
import DisplaySnack from '../snackbar';

// lib
import { DATABASE } from '../../lib/links';

// utils
import { TextFieldWithErr } from '../../utils/form_helper';
import { getFetcher, getClientToken } from '../../utils/data_helper';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(1),
  },
}));

export default function SearchForm() {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const initialValues = {
    username: '',
  };

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const { username } = data;
    const token = getClientToken();

    const getData = await getFetcher(
      `${DATABASE}${username.toUpperCase()}/`,
      token
    );

    if (getData.messsage === 'Username Not Found') {
      handleSnackbarOpen();
      return;
    }

    setTimeout(() => {
      setSubmitting(false);
      router.push(`/database?username=${username.toUpperCase()}`);
    }, 1000);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12} md={9}>
                <TextFieldWithErr
                  label="Search username"
                  name="username"
                  uppercased
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  fullWidth>
                  Search
                </Button>
                {isSubmitting && <LinearProgress />}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <DisplaySnack open={open} onClose={handleSnackbarClose} severity="error">
        Username tidak ada! / Username tidak berada dalam grup anda!
      </DisplaySnack>
    </>
  );
}
