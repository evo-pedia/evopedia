// @material-ui core
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c71414',
      dark: '#9e1111',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff3f2',
    },
    text: {
      primary: '#3a3a3a',
    },
    accent: {
      main: '#e6ad0f',
    },
    background: {
      default: '#fff',
    },
    success: {
      main: '#4caf50',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#42A5F5',
      light: '#E3F2FD',
    },
    convert: {
      background: '#23B5D3',
    },
    topPanels: {
      publisher: '#43A047',
      development: '#FB8C00',
      advertising: '#5E35B1',
      excel: '#1976D2',
    },
    rewards: {
      clubTrainer: '#1e88e5',
      starClub: '#fdd835',
      bronzeStar: 'linear-gradient(116.84deg, #6D4C41 0%, #CD7F32 100%)',
      silverStar: 'linear-gradient(116.95deg, #C0C0C0 0%, #F5F5F5 63.95%)',
      goldStar: 'linear-gradient(116.84deg, #EF6C00 0%, #FFD700 100%)',
      diamondStar: 'linear-gradient(116.84deg, #6A1B9A 0%, #AB47BC 100%)',
      redDiamondStar: 'linear-gradient(116.84deg, #B71C1C 0%, #F44336 100%)',
      blackDiamondStar:
        'linear-gradient(116.22deg, #2F0E3D 0.88%, #7B1FA2 100%)',
    },
  },
});

export default theme;
