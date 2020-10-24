// @material-ui core
import Grid from '@material-ui/core/Grid';

// prop-types
import PropTypes from 'prop-types';

// local
import Group from './group';

function getMemberData({ socialpreneur, classA, classB, referral }) {
  const struct = [
    {
      id: 1,
      label: 'Social Preneur',
      value: socialpreneur,
    },
    {
      id: 2,
      label: 'Kelas Member A',
      value: classA,
    },
    {
      id: 3,
      label: 'Kelas Member B',
      value: classB,
    },
    {
      id: 4,
      label: 'Jumlah Publisher',
      value: referral,
    },
  ];

  return struct;
}

export default function Members({ membersData }) {
  const members = getMemberData(membersData);

  return (
    <Grid container spacing={2}>
      {members.map(({ id, ...props }) => (
        <Grid item xs={12} md key={id}>
          <Group {...props} />
        </Grid>
      ))}
    </Grid>
  );
}

Members.propTypes = {
  membersData: PropTypes.object.isRequired,
};
