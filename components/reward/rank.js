// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

// prop-types
import PropTypes from 'prop-types';

export default function Rank({
  score,
  bgSrc,
  imgSrc,
  label,
  currentRank,
  isStar,
  isDiamond,
  isGrayscale,
  blackText,
}) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      background: bgSrc,
      borderRadius: '8px',
    },
    label: {
      fontSize: '1rem',
    },
    grid: {
      backgroundRepeat: 'no-repeat',
    },
    diamond: {
      backgroundImage: 'url(assets/rewards/diamond.svg)',
      backgroundPositionX: '-20px',
    },
    star: {
      backgroundImage: 'url(assets/rewards/star.svg)',
      backgroundPositionX: '-10px',
      backgroundPositionY: '-10px',
    },
    grayscale: {
      filter: 'grayscale(100%)',
    },
    white: {
      color: theme.palette.common.white,
    },
    current: {
      border: `2px solid ${theme.palette.primary.dark}`,
      boxShadow: `0 0 10px 5px ${theme.palette.primary.dark}`,
    },
  }));

  const classes = useStyles();
  const paperBg = clsx(
    classes.paper,
    !blackText && classes.white,
    isGrayscale && classes.grayscale,
    currentRank && classes.current
  );
  const gridBg = clsx(
    classes.grid,
    isStar && classes.star,
    isDiamond && classes.diamond
  );

  return (
    <Paper className={paperBg} elevation={5}>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
        className={gridBg}>
        <Grid item xs>
          <Typography variant="h2">{score}</Typography>
        </Grid>
        <Grid item xs>
          <img src={imgSrc} alt="rank" width="200vw" />
        </Grid>
        <Grid item xs>
          <Typography variant="overline" className={classes.label}>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

Rank.defaultProps = {
  isStar: false,
  isDiamond: false,
  isGrayscale: false,
  blackText: false,
  currentRank: false,
};

Rank.propTypes = {
  score: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgSrc: PropTypes.string.isRequired,
  isStar: PropTypes.bool,
  isDiamond: PropTypes.bool,
  isGrayscale: PropTypes.bool,
  blackText: PropTypes.bool,
  currentRank: PropTypes.bool,
};
