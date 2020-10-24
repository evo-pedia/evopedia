// @material-ui core
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

// local
import Rank from './rank';

// utils
import { convertRank } from '../../utils/data_helper';

function getRanks(theme, socialpreneur) {
  const convertedRank = convertRank(socialpreneur);
  const baseStruct = [
    {
      id: 1,
      score: '0.0',
      label: 'New Community',
      bgSrc: theme.palette.common.white,
      imgSrc: 'assets/rewards/not_qualified.svg',
      blackText: true,
    },
    {
      id: 2,
      score: '1.5',
      label: 'Club Trainer',
      bgSrc: theme.palette.rewards.clubTrainer,
      imgSrc: 'assets/rewards/club_trainer.svg',
    },
    {
      id: 3,
      score: '2.0',
      label: 'Star Club',
      bgSrc: theme.palette.rewards.starClub,
      imgSrc: 'assets/rewards/star_club.svg',
      blackText: true,
    },
    {
      id: 4,
      score: '2.5',
      label: 'Bronze Star',
      bgSrc: theme.palette.rewards.bronzeStar,
      imgSrc: 'assets/rewards/bronze_star.svg',
      isStar: true,
    },
    {
      id: 5,
      score: '3.0',
      label: 'Silver Star',
      bgSrc: theme.palette.rewards.silverStar,
      imgSrc: 'assets/rewards/silver_star.svg',
      isStar: true,
      blackText: true,
    },
    {
      id: 6,
      score: '3.5',
      label: 'Gold Star',
      bgSrc: theme.palette.rewards.goldStar,
      imgSrc: 'assets/rewards/gold_star.svg',
      isStar: true,
    },
    {
      id: 7,
      score: '4.0',
      label: 'Diamond Star',
      bgSrc: theme.palette.rewards.diamondStar,
      imgSrc: 'assets/rewards/diamond_star.svg',
      isDiamond: true,
    },
    {
      id: 8,
      score: '4.5',
      label: 'Red Diamond Star',
      bgSrc: theme.palette.rewards.redDiamondStar,
      imgSrc: 'assets/rewards/red_diamond_star.svg',
      isDiamond: true,
    },
    {
      id: 9,
      score: '5.0',
      label: 'Black Diamond Star',
      bgSrc: theme.palette.rewards.blackDiamondStar,
      imgSrc: 'assets/rewards/black_diamond_star.svg',
      isDiamond: true,
    },
  ];

  let grayscaleActive = false;
  const struct = [];

  for (let i = 0; i < baseStruct.length; i += 1) {
    if (grayscaleActive) {
      baseStruct[i].isGrayscale = true;
    }

    if (convertedRank === baseStruct[i].label) {
      baseStruct[i].currentRank = true;
      grayscaleActive = true;
    }

    struct.push(baseStruct[i]);
  }

  return struct;
}

export default function AllRanks({ socialpreneur }) {
  const theme = useTheme();
  const ranks = getRanks(theme, socialpreneur);

  return (
    <Grid container spacing={2}>
      {ranks.map(({ id, ...props }) => (
        <Grid item xs={12} md={4} key={id}>
          <Rank {...props} />
        </Grid>
      ))}
    </Grid>
  );
}

AllRanks.propTypes = {
  socialpreneur: PropTypes.number.isRequired,
};
