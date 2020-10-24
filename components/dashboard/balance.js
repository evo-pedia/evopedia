// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// prop-types
import PropTypes from 'prop-types';

export default function Balance({ imgSrc, label, value }) {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs>
        <img src={imgSrc} alt="Balance" width="50vw" />
      </Grid>
      <Grid item xs>
        <Typography variant="overline">{label}</Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="inherit" color="primary">
          <b>{Number(value).toFixed(2)}</b>
        </Typography>
      </Grid>
    </Grid>
  );
}

Balance.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
