// next
import { useRouter } from 'next/router';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.success.main,
    width: '20vw',
    height: '20vh',
  },
}));

export default function FormSuccess({ children }) {
  const classes = useStyles();
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.grid}>
      <Grid item xs>
        <CheckCircleIcon className={classes.icon} />
      </Grid>
      <Grid item xs>
        <Typography variant="h5" gutterBottom>
          Berhasil!
        </Typography>
      </Grid>
      <Grid item xs>
        {children}
      </Grid>
      <Grid item xs>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Kembali ke Dashboard
        </Button>
      </Grid>
    </Grid>
  );
}

FormSuccess.propTypes = {
  children: PropTypes.element.isRequired,
};
