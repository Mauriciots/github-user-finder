import { createTheme } from '@mui/material/styles'

const customBlack = '#413D3D'
const customLightGrey = '#D3D3D34A'

const theme = createTheme({
  palette: {
    primary: {
      main: customBlack,
    },
    secondary: {
      main: customLightGrey,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '40px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: customLightGrey,
        },
      },
    },
  },
  typography: {
    h2: {
      fontSize: '3rem',
    },
  },
})

export default theme
