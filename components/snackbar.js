// @material-ui core
import Snackbar from '@material-ui/core/Snackbar';

// @material-ui lab
import MuiAlert from '@material-ui/lab/Alert';

// prop-types
import PropTypes from 'prop-types';

function Alert({ ...props }) {
  return <MuiAlert elevation={5} variant="filled" {...props} />;
}

export default function DisplaySnack({ children, ...props }) {
  return (
    <Snackbar autoHideDuration={6500} {...props}>
      <Alert {...props}>{children}</Alert>
    </Snackbar>
  );
}

DisplaySnack.propTypes = {
  children: PropTypes.string.isRequired,
};
