// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

// local
import VideoForm from './video_form';
import NotActivated from './not_activated';
import EmptyVid from './empty_vid';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
}));

export default function VideoDetails({
  isActivated,
  isProfileExists,
  vidList,
  ...props
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // TODO: demo
  const handleOpenForm = () => {
    setOpen(true);
  };

  if (!isActivated) {
    return <NotActivated />;
  }

  if (!vidList.length || !isProfileExists) {
    return (
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h5">
          <b>Video Saya</b>
        </Typography>
        {open ? (
          <VideoForm vidList={vidList} {...props} />
        ) : (
          <EmptyVid
            openForm={handleOpenForm}
            isProfileExists={isProfileExists}
          />
        )}
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="h5">
        <b>Video Saya</b>
      </Typography>
      <VideoForm vidList={vidList} {...props} />
    </Paper>
  );
}

VideoDetails.defaultProps = {
  isActivated: false,
  isProfileExists: false,
};

VideoDetails.propTypes = {
  isActivated: PropTypes.bool,
  isProfileExists: PropTypes.bool,
  vidList: PropTypes.array.isRequired,
};
