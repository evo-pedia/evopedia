// next
import { useRouter } from 'next/router';

// @material-ui core
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// utils
import { TextFieldWithErr } from '../../utils/form_helper';
import { passwordEditValidationSchema } from '../../utils/yup_validation';
import { postFetcher, getClientToken } from '../../utils/data_helper';

// local
import Notes from '../notes';

// lib
import { UPDATE_PASSWORD } from '../../lib/links';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  negative: {
    color: theme.palette.accent.main,
  },
}));

export default function PasswordEditForm({ negativeClick }) {
  const classes = useStyles();
  const router = useRouter();
  const initialValues = {
    oldPass: '',
    newPass: '',
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const token = getClientToken();
    const { oldPass: password_lama, newPass: password_baru } = data;
    const struct = {
      password_lama,
      password_baru,
    };
    const postData = await postFetcher(UPDATE_PASSWORD, struct, token);

    setTimeout(() => {
      setSubmitting(false);
    }, 1500);

    if (postData === 201) {
      router.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={passwordEditValidationSchema}>
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <TextFieldWithErr
            label="Password Lama"
            name="oldPass"
            type="password"
          />
          <Divider className={classes.divider} />
          <Notes>
            <Typography>
              Password harus mengandung minimal 1 simbol, 1 angka, 1 huruf
              kapital dan 8 karakter.
            </Typography>
          </Notes>
          <Divider className={classes.divider} />
          <TextFieldWithErr
            label="Password Baru"
            name="newPass"
            type="password"
          />
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

PasswordEditForm.propTypes = {
  negativeClick: PropTypes.func.isRequired,
};
