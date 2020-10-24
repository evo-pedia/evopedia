// react
import { Fragment } from 'react';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

// local
import Info from './info';

function getUserData({ email, phone, publisher, mentor, socialpreneur }) {
  const struct = [
    {
      id: 1,
      title: 'Email',
      value: email,
      isEditable: true,
    },
    {
      id: 2,
      title: 'Nomor Telepon',
      value: phone,
      isEditable: true,
    },
    {
      id: 3,
      title: 'Publisher',
      value: publisher,
    },
    {
      id: 4,
      title: 'Mentor',
      value: mentor,
    },
    {
      id: 5,
      title: 'Poin Socialpreneur',
      value: socialpreneur,
    },
  ];

  return struct;
}

export default function UserData({ ...profileData }) {
  const contents = getUserData({ ...profileData });
  return (
    <Grid container spacing={3} direction="column" justify="center">
      {contents.map(({ id, ...data }) => (
        <Fragment key={id}>
          <Grid item xs>
            <Info {...data} />
          </Grid>
          {id !== 5 && <Divider />}
        </Fragment>
      ))}
    </Grid>
  );
}
