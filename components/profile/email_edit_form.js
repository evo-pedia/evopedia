// next
import { useRouter } from 'next/router';

// @material-ui core
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// local
import { TextFieldWithErr } from '../../utils/form_helper';
import { emailEditValidationSchema } from '../../utils/yup_validation';

// lib
import { UPDATE_EMAIL } from '../../lib/links';

// utils
import { postFetcher, getClientToken } from '../../utils/data_helper';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  negative: {
    color: theme.palette.accent.main,
  },
  oldEmail: {
    fontSize: '1rem',
  },
}));

export default function EmailEditForm({ negativeClick, value }) {
  const classes = useStyles();
  const router = useRouter();
  const initialValues = {
    email: '',
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const token = getClientToken();
    const { email } = data;
    const struct = {
      email,
    };

    const postData = await postFetcher(UPDATE_EMAIL, struct, token);

    setTimeout(() => {
      setSubmitting(false);
    }, 1500);

    if (postData.message === 'update email berhasil') {
      router.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={emailEditValidationSchema}>
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <Typography variant="body1">
            <b>Email sebelumnya:</b>
          </Typography>
          <Typography variant="overline" className={classes.oldEmail}>
            {value}
          </Typography>
          <Divider />
          <TextFieldWithErr label="Email baru" name="email" />
          <DialogActions>
            {isSubmitting ? (
              <CircularProgress size="2rem" />
            ) : (
              <Button
                size="large"
                type="button"
                onClick={negativeClick}
                className={classes.negative}>
                Tutup
              </Button>
            )}
            <Button
              size="large"
              type="submit"
              disabled={isSubmitting}
              color="primary">
              Ubah
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}

EmailEditForm.propTypes = {
  negativeClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
