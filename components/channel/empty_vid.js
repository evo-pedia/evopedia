// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(5),
  },
}));

export default function EmptyVid({ openForm, isProfileExists }) {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.grid}>
      <Grid item xs>
        <img src="assets/images/empty_vid.png" alt="novid" width="250vw" />
      </Grid>
      <Grid item xs>
        <Typography variant="h5">
          <b>Anda Belum Memiliki Video</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography>
          {isProfileExists
            ? 'Silahkan tambahkan link video untuk ditampilkan'
            : 'Anda belum mengisi data channel di atas!'}
        </Typography>
      </Grid>
      <Grid item xs>
        {isProfileExists && (
          <Button
            variant="contained"
            color="primary"
            onClick={openForm}
            fullWidth>
            Tambah Link Video
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

EmptyVid.propTypes = {
  openForm: PropTypes.func.isRequired,
  isProfileExists: PropTypes.bool.isRequired,
};
