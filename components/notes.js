// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.info.main,
    width: '100%',
    height: '12vh',
  },
  grid: {
    backgroundColor: theme.palette.info.light,
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Notes({ children }) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={1}
      className={classes.grid}
      justify="center"
      alignItems="center">
      <Grid item xs={12} md={4}>
        <InfoOutlinedIcon className={classes.icon} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography>
          <b>Catatan :</b>
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
}

Notes.defaultProps = {
  children: null,
};

Notes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
