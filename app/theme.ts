import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#757575',
      light: '#9e9e9e',
      dark: '#616161',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '"Hiragino Kaku Gothic Pro"',
      '"ヒラギノ角ゴ Pro W3"',
      '"メイリオ"',
      'Meiryo',
      '"ＭＳ Ｐゴシック"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '2rem',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
});

export default theme;
