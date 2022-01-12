import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #__next': {
          height: '100%',
        },
        '#__next': {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
});
