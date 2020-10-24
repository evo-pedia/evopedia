// react
import { useState } from 'react';

// @material-ui core
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import LockIcon from '@material-ui/icons/Lock';

// local
import PasswordEditForm from './password_edit_form';
import Modal from '../modal';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    fontSize: '1rem',
  },
}));

export default function Password() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<LockIcon />}
        className={classes.button}
        onClick={handleModalOpen}
        fullWidth>
        Ganti Password
      </Button>
      <Modal title="Ubah Password" open={open} onClose={handleModalClose}>
        <DialogContentText>
          Input password lama anda setelah itu masukan password baru anda!
        </DialogContentText>
        <PasswordEditForm negativeClick={handleModalClose} />
      </Modal>
    </>
  );
}
