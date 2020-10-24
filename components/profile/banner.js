// @material-ui core
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(10),
  },
  banner: {
    display: 'block',
    margin: '0 auto',
    width: '25vw',
  },
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.box}>
      <img
        src="evopedia_logo_wide.png"
        alt="Evo Banner"
        className={classes.banner}
      />
    </Box>
  );
}
