// @material-ui core
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  loading: {
    display: 'block',
    margin: '2em auto',
  },
}));

export default function Modal({ open, onClose, title, children }) {
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {!children ? (
          <CircularProgress size="2rem" className={classes.loading} />
        ) : (
          children
        )}
      </DialogContent>
    </Dialog>
  );
}

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};
