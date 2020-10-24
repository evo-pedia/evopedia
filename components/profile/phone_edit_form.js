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
import { phoneEditValidationSchema } from '../../utils/yup_validation';

// lib
import { UPDATE_PHONE } from '../../lib/links';

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
  oldPhone: {
    fontSize: '1.5rem',
  },
}));

export default function PhoneEditForm({ negativeClick, value }) {
  const classes = useStyles();
  const router = useRouter();
  const initialValues = {
    phone: '',
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const token = getClientToken();
    const { phone } = data;
    const struct = {
      phone,
    };

    const postData = await postFetcher(UPDATE_PHONE, struct, token);

    setTimeout(() => {
      setSubmitting(false);
    }, 1500);

    if (postData.message === 'update phone berhasil') {
      router.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={phoneEditValidationSchema}>
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <Typography variant="body1">
            <b>Nomer Telepon sebelumnya:</b>
          </Typography>
          <Typography variant="overline" className={classes.oldPhone}>
            {value}
          </Typography>
          <Divider />
          <TextFieldWithErr label="Nomer Telepon baru" name="phone" />
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

PhoneEditForm.propTypes = {
  negativeClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
