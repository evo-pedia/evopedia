// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  image: {
    display: 'block',
    margin: '0 auto',
  },
}));

export default function TransferDetails({ type, total }) {
  const classes = useStyles();

  // just two types if needed, refactor this
  const newType = type === 'peds' ? 'PED Poin' : 'Voucher';

  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid item xs>
        <img
          src="assets/icons/voucher_icon.svg"
          alt="Icon V"
          width="135vw"
          className={classes.image}
        />
      </Grid>
      <Grid item xs>
        <Grid container spacing={1} direction="column">
          <Grid item xs>
            <Typography variant="overline">
              <b>Jenis Transfer</b>
            </Typography>
            <Typography>{newType}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="overline">
              <b>Jumlah Transfer</b>
            </Typography>
            <Typography>{total}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

TransferDetails.propTypes = {
  type: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
