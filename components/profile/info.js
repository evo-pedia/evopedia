// react
import { useState } from 'react';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui core
import EditIcon from '@material-ui/icons/Edit';

// prop-types
import PropTypes from 'prop-types';

// local
import Modal from '../modal';
import EmailEditForm from './email_edit_form';
import PhoneEditForm from './phone_edit_form';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.accent.main,
  },
  value: {
    fontSize: '1rem',
  },
}));

export default function Info({ title, value, isEditable }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Check type for modal ( only 2 )
  // TODO: refactor this later
  const modalFor = title.includes('Email') ? 'email' : 'phone';
  const modalTitle = modalFor === 'email' ? 'Ubah Email' : 'Ubah Nomer Telepon';

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={!isEditable ? 12 : 9}>
          <Grid container spacing={2} direction="column">
            <Grid item xs>
              <Typography variant="h6">
                <b>{title}</b>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                variant="overline"
                className={classes.value}
                gutterBottom>
                {value}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {isEditable && (
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<EditIcon />}
              className={classes.button}
              onClick={handleModalOpen}>
              Ubah
            </Button>
          </Grid>
        )}
      </Grid>
      <Modal title={modalTitle} open={open} onClose={handleModalClose}>
        <DialogContentText>
          Gunakan data diri anda yang dapat dipertanggungjawabkan.
        </DialogContentText>
        {modalFor === 'email' && (
          <EmailEditForm negativeClick={handleModalClose} value={value} />
        )}
        {modalFor === 'phone' && (
          <PhoneEditForm negativeClick={handleModalClose} value={value} />
        )}
      </Modal>
    </>
  );
}

Info.defaultProps = {
  isEditable: false,
};

Info.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditable: PropTypes.bool,
};
