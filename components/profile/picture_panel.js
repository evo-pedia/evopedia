// @material-ui core
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

// utils
import { getFirstCharacter, convertRank } from '../../utils/data_helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    padding: theme.spacing(3),
    borderRadius: '8px',
  },
  avatar: {
    fontSize: '5rem',
    background: theme.palette.accent.main,
    width: '2em',
    height: '2em',
  },
  overline: {
    fontSize: '1rem',
  },
}));

export default function PicturePanel({
  name,
  username,
  joinDate,
  socialpreneur,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center">
        <Grid item xs>
          <Avatar className={classes.avatar}>{getFirstCharacter(name)}</Avatar>
        </Grid>
        <Grid item xs>
          <Grid container spacing={2} direction="column">
            <Grid item xs>
              <Typography variant="h4">
                <b>{name}</b>
              </Typography>
              <Typography
                variant="overline"
                className={classes.overline}
                gutterBottom>
                {username}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs>
              <Typography variant="h5">
                <b>Peringkat</b>
              </Typography>
              <Typography
                variant="overline"
                className={classes.overline}
                gutterBottom>
                {convertRank(socialpreneur)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h5">
                <b>Tanggal Bergabung</b>
              </Typography>
              <Typography
                variant="overline"
                className={classes.overline}
                gutterBottom>
                {joinDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

PicturePanel.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  joinDate: PropTypes.string.isRequired,
  socialpreneur: PropTypes.number.isRequired,
};
