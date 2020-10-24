// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    borderRadius: '8px',
  },
  grid: {
    padding: theme.spacing(4),
  },
}));

// TODO: for history later, make DRY on 'type' prop
export default function History({ label, imgSrc }) {
  const classes = useStyles();

  // TODO: datatables later, gonna insert hardcode first
  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="h4" gutterBottom>
        {label}
      </Typography>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}>
        <Grid item xs>
          <img src={imgSrc} alt="History" width="200vw" />
        </Grid>
        <Grid item xs>
          <Typography variant="overline">{`Belum ada ${label}`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

History.propTypes = {
  label: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};
