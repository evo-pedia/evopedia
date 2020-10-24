// react
import { Fragment } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

// local
import Balance from './balance';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
  horizontalDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function getWalletData({ ads, peds, voucher }) {
  const struct = [
    {
      id: 1,
      imgSrc: 'assets/icons/ads_poin.svg',
      label: 'ADS Poin',
      value: ads,
    },
    {
      id: 2,
      imgSrc: 'assets/icons/ped_poin_icon.svg',
      label: 'PED Poin',
      value: peds,
    },
    {
      id: 3,
      imgSrc: 'assets/icons/voucher_icon.svg',
      label: 'Voucher',
      value: voucher,
    },
  ];

  return struct;
}

export default function Wallet({ walletData }) {
  const classes = useStyles();
  const content = getWalletData(walletData);

  return (
    <Paper className={classes.paper} elevation={5}>
      <Grid container spacing={1}>
        {content.map(({ id, ...data }) => (
          <Fragment key={id}>
            <Grid item xs={12} md>
              <Balance {...data} />
              {id !== 3 && <Divider className={classes.horizontalDivider} />}
            </Grid>
            {id !== 3 && <Divider orientation="vertical" flexItem />}
          </Fragment>
        ))}
      </Grid>
    </Paper>
  );
}

Wallet.propTypes = {
  walletData: PropTypes.object.isRequired,
};
