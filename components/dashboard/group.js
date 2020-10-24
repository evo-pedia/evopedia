// @material-ui core
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    backgroundImage: 'url(assets/user.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: '-35px',
    backgroundPositionY: '10px',
    borderRadius: '8px',
  },
}));

export default function Group({ label, value }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="h4">{value}</Typography>
      <Typography variant="overline">{label}</Typography>
    </Paper>
  );
}

Group.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
