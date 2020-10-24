// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

// lib
import { CLAIM_REWARD } from '../../lib/links';

// utils
import {
  postFetcher,
  getClientToken,
  convertRankNum,
} from '../../utils/data_helper';

// local
import DisplaySnack from '../snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
  name: {
    fontSize: '1.5rem',
  },
  username: {
    fontSize: '0.8rem',
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  child: {
    margin: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      margin: '0 auto',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '17em',
    },
  },
}));

export default function PublisherDetails({
  name,
  username,
  publisherUname,
  publisherName,
  socialpreneur,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  };

  const handleClaimReward = async () => {
    const token = getClientToken();
    const struct = [
      {
        jenis_reward: convertRankNum(socialpreneur),
      },
    ];
    const postData = await postFetcher(CLAIM_REWARD, struct, token);

    if (postData !== 201) {
      setError(true);
      setMsg('Anda sudah claim reward! / Poin tidak cukup!');
      handleSnackbarOpen();
      return;
    }

    setError(false);
    setMsg('Berhasil claim reward!');
    handleSnackbarOpen();
  };

  return (
    <>
      <Paper className={classes.paper} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} className={classes.child}>
            <Typography variant="h6">
              <b>Profile</b>
            </Typography>
            <Typography variant="button" className={classes.name}>
              {name}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="overline" className={classes.username}>
              {username}
            </Typography>
            {/* TODO: add this later 
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClaimReward}
                fullWidth>
                Claim Reward
              </Button>
              */}
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md={3} className={classes.child}>
            <Typography variant="h6">
              <b>Publisher</b>
            </Typography>
            <Typography variant="button" className={classes.name}>
              {publisherName}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="overline" className={classes.username}>
              {publisherUname}
            </Typography>
          </Grid>
          <Grid item xs={false} md={3} className={classes.image}>
            <img
              src="assets/images/reward_image.png"
              alt="peringkat"
              width="240vw"
            />
          </Grid>
        </Grid>
      </Paper>
      <DisplaySnack
        open={open}
        onClose={handleSnackbarClose}
        severity={error ? 'error' : 'success'}>
        {msg}
      </DisplaySnack>
    </>
  );
}

PublisherDetails.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  publisherUname: PropTypes.string.isRequired,
  publisherName: PropTypes.string.isRequired,
  socialpreneur: PropTypes.number.isRequired,
};
