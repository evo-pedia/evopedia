// react
import { useState } from 'react';
import Link from 'next/link';


// @material-ui core
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

// prop-types
import PropTypes from 'prop-types';

// clsx
import clsx from 'clsx';

// utils
import { getFirstCharacter } from '../../utils/data_helper';

// local
import Modal from '../modal';
import NewStudentForm from './new_student_form';

function getTreeContent(classType, socialpreneur, students, omset, peds, evoucher) {
  const struct = [
    {
      id: 1,
      title: 'Kelas',
      content: classType === '1' ? 'A' : 'B',
    },
    {
      id: 2,
      title: 'Socialpreneur',
      content: socialpreneur,
    },
    {
      id: 3,
      title: 'Jumlah Followers',
      content: students,
    },
    ... omset !== null ?[
    {
      id: 4,
      title: 'Omset Kelas A',
      content: omset.omset_anak_kiri ?? 0
    },
    {
      id: 5,
      title: 'Omset Kelas B',
      content: omset.omset_anak_kanan ?? 0
    }] : [],
    {
      id: 6,
      title: 'Peds',
      content: peds.toFixed(2) ?? 0
    },
    {
      id: 7,
      title: 'Voucher',
      content: evoucher.toFixed(2) ?? 0
    }
  ];

  return struct;
}

function TreeContent({ title, content }) {
  return (
    <Grid item xs={12} md>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="p">{content}</Typography>
    </Grid>
  );
}

TreeContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default function TreeData({
  username,
  position: classType,
  deposit_activation: socialpreneur,
  jumlah_student: students,
  status,
  noAvatarColor,
  disablePlus,
  omset,
  parent,
  peds,
  evoucher,
  name
}) {
  const useStyles = makeStyles((theme) => ({
    grid: {
      textAlign: 'center',
    },
    avatarAccent: {
      marginRight: '1em',
      backgroundColor: theme.palette.convert.background,
    },
    avatarBg: {
      backgroundColor:
        classType === '1'
          ? theme.palette.accent.main
          : theme.palette.primary.main,
    },
    icon: {
      color:
        classType === '1'
          ? theme.palette.accent.main
          : theme.palette.primary.main,
    },
  }));

  const classes = useStyles();
  const contents = getTreeContent(classType, socialpreneur, students, omset, peds, evoucher);
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="center"
          className={classes.grid}>
        <Link href={`/database?username=${username}`}>
          <Grid item xs={10} container direction>
          <Grid item xs={12} md={1}>
            <Avatar
              className={clsx(
                classes.avatarAccent,
                !noAvatarColor && classes.avatarBg
              )}>
              {getFirstCharacter(username)}
            </Avatar>
          </Grid>
          <Grid container item xs={12} md>
            <Grid item xs={10}>
              <Typography variant="h5">
                <b>{username}</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7">
                <b>{name}</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7">
                <b>{parent}</b>
              </Typography>
            </Grid>
          </Grid>
          {contents.map(({ id, ...data }) => (
            <TreeContent key={id} {...data} />
          ))}
            </Grid>
          </Link>
          {!disablePlus ? (
            <Grid item xs={12} md={2}>
              <IconButton onClick={handleModalOpen}>
                <AddCircleIcon
                  fontSize="large"
                  className={clsx(!noAvatarColor && classes.icon)}
                />
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
      <Modal
        open={open}
        onClose={handleModalClose}
        title="Register New Follower">
        <DialogContentText>
          Data yang digunakan wajib dapat dipertanggungjawabkan!
        </DialogContentText>
        <NewStudentForm
          negativeClick={handleModalClose}
          mentor={username}
          status={status}
        />
      </Modal>
    </>
  );
}

TreeData.defaultProps = {
  noAvatarColor: false,
  disablePlus: false,
};

TreeData.propTypes = {
  username: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  deposit_activation: PropTypes.number.isRequired,
  jumlah_student: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  noAvatarColor: PropTypes.bool,
  disablePlus: PropTypes.bool,
};
