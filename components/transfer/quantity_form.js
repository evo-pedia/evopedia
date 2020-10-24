// @material-ui core
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// utils
import { TextFieldWithErr, SelectWithErr } from '../../utils/form_helper';
import { quantityValidationSchema } from '../../utils/yup_validation';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export default function QuantityForm({
  positiveClick,
  handleType,
  handleTotal,
  type,
  total,
}) {
  const classes = useStyles();
  const initialValues = {
    jenis: type,
    jumlah: total,
  };

  const handleSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);

    const { jenis, jumlah } = data;

    setTimeout(() => {
      setSubmitting(false);
      handleType(jenis);
      handleTotal(jumlah);
      positiveClick();
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={quantityValidationSchema}>
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <Grid container spacing={1} direction="column">
            <Grid item xs>
              <SelectWithErr label="Jenis transfer" name="jenis">
                <MenuItem value="">-- PILIH --</MenuItem>
                <MenuItem value="peds">PED Poin</MenuItem>
                <MenuItem value="evoucher">Voucher</MenuItem>
              </SelectWithErr>
            </Grid>
            <Grid item xs>
              <TextFieldWithErr
                label="Jumlah transfer"
                name="jumlah"
                type="number"
              />
            </Grid>
            <Grid item xs>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth>
                Selanjutnya
              </Button>
              {isSubmitting && <LinearProgress />}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

QuantityForm.propTypes = {
  positiveClick: PropTypes.func.isRequired,
  handleType: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
