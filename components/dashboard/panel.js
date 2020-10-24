// @material-ui core
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

export default function Panel({ bgColor, imgSrc, value, label }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      textAlign: 'center',
      color: theme.palette.common.white,
      padding: theme.spacing(2),
      borderRadius: '8px',
      backgroundColor: bgColor,
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Grid container>
        <Grid item xs>
          <img src={imgSrc} alt="Panel" width="100vw" />
        </Grid>
        <Grid item xs>
          <Typography variant="h3">{Number(value).toFixed(2)}</Typography>
          <Typography variant="overline">{label}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

Panel.propTypes = {
  bgColor: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
