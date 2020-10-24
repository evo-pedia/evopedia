// next
import { useRouter } from 'next/router';

// @material-ui core
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// utils
import {
  TextFieldWithErr,
  SelectWithErr,
  CheckboxWithErr,
} from '../../utils/form_helper';
import { convertValidationSchema } from '../../utils/yup_validation';
import {
  postFetcher,
  getClientToken,
  getCookiesData,
} from '../../utils/data_helper';

// lib
import { convertCommition } from '../../lib/konversi_komisi';
import { CONVERT } from '../../lib/links';

// local
import Notes from '../notes';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // buat ie titit
    marginTop: theme.spacing(1),
  },
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(3),
  },
  negative: {
    color: theme.palette.accent.main,
  },
}));

export default function ConvertForm({ negativeClick, onError }) {
  const classes = useStyles();
  const router = useRouter();
  const { evopediaRole } = getCookiesData();
  const initialValues = {
    komisi: '',
    poin: '',
    sk: false,
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);
    const { komisi, poin } = data;

    const struct = {
      tipe_bonus: komisi,
      value: poin,
    };

    const token = getClientToken();
    const postData = await postFetcher(CONVERT, struct, token);

    setSubmitting(false);

    if (postData === 201) {
      negativeClick();
      router.replace('/dashboard');
      return;
    }

    onError();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={convertValidationSchema}>
      {({ values, isSubmitting }) => (
        <Form className={classes.form}>
          {/* Change MenuItem value later */}
          <SelectWithErr label="Komisi dari" name="komisi">
            <MenuItem value="">-- PILIH --</MenuItem>
            <MenuItem value="bonus_sponsor">Publisher</MenuItem>
            <MenuItem value="bonus_pairing">Development</MenuItem>
            <MenuItem value="bonus_level">Advertising</MenuItem>
            {evopediaRole === 'MAJESTY' && (
              <MenuItem value="bonus_majesti">Majesty</MenuItem>
            )}
            {evopediaRole === 'EXECUTIVE CORE LEADER' && (
              <MenuItem value="bonus_ecl">Excel</MenuItem>
            )}
          </SelectWithErr>
          <TextFieldWithErr label="Poin" name="poin" type="number" />
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} md={6}>
              <Typography>Voucher yang dihasilkan</Typography>
              <Typography variant="h2">
                {convertCommition(values.poin)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>PED Poin yang dihasilkan</Typography>
              <Typography variant="h2">
                {convertCommition(values.poin)}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Notes>
            <CheckboxWithErr
              label="Saya menyetujui syarat dan ketentuan yang berlaku."
              name="sk"
            />
          </Notes>
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
              Konversi
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}

ConvertForm.propTypes = {
  negativeClick: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
