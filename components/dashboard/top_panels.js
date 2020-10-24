// @material-ui core
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

// prop-types
import PropTypes from 'prop-types';

// local
import Panel from './panel';

function getPanelData(
  theme,
  { publisher, development, advertising, excel, majesty }
) {
  const struct = [
    {
      id: 1,
      bgColor: theme.palette.topPanels.publisher,
      imgSrc: 'assets/top_panels/publisher.svg',
      value: publisher,
      label: 'Publisher',
    },
    {
      id: 2,
      bgColor: theme.palette.topPanels.development,
      imgSrc: 'assets/top_panels/development.svg',
      value: development,
      label: 'Development',
    },
    {
      id: 3,
      bgColor: theme.palette.topPanels.advertising,
      imgSrc: 'assets/top_panels/adv.svg',
      value: advertising,
      label: 'Advertising',
    },
    ...(majesty || excel
      ? [
          {
            id: 4,
            bgColor: theme.palette.topPanels.excel,
            imgSrc: 'assets/top_panels/executive_core_leader.svg',
            ...(excel && { value: excel, label: 'Excel' }),
            ...(majesty && { value: majesty, label: 'Majesty' }),
          },
        ]
      : []),
  ];

  return struct;
}

export default function TopPanel({ dataKomisi }) {
  const theme = useTheme();
  const panel = getPanelData(theme, dataKomisi);

  return (
    <Grid container spacing={3}>
      {panel.map(({ id, ...props }) => (
        <Grid item xs={12} md key={id}>
          <Panel {...props} />
        </Grid>
      ))}
    </Grid>
  );
}

TopPanel.propTypes = {
  dataKomisi: PropTypes.object.isRequired,
};
