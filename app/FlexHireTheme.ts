import { createTheme, alpha } from '@material-ui/core/styles'
import { extractQueryParams } from 'services/router'

const queryColor = typeof window !== 'undefined' ? extractQueryParams(window.location.href).color : ''

const baseTheme = createTheme({
  palette: {
    primary: {
      main: queryColor || 'rgb(46, 203, 128)',
      contrastText: queryColor ? undefined : '#fff',
    },
    secondary: {
      main: queryColor || '#017EFF ',
    },
    text: {
      primary: '#04041E',
    },
    grey: {
      // TODO: implement shades before re-enabling this
      // 50: '#96ADC6',
      // 100: '#96ADC6',
      // 200: '#96ADC6',
      // 300: '#96ADC6',
      // 400: '#96ADC6',
      // 500: '#96ADC6',
      // 600: '#96ADC6',
      // 700: '#96ADC6',
      // 800: '#96ADC6',
      // 900: '#96ADC6',
      // A100: '#96ADC6',
      // A200: '#96ADC6',
      // A400: '#96ADC6',
      // A700: '#96ADC6',
    },
  },
  typography: {
    h1: {
      fontSize: '40px',
      fontWeight: 100,
      '@media (max-width:800px)': {
        fontSize: '24px',
      },
    },
    h2: {
      fontSize: '32px',
      fontWeight: 500,
      '@media (max-width:800px)': {
        fontSize: '20px',
      },
    },
    h3: {
      fontSize: '24px',
      fontWeight: 500,
      '@media (max-width:800px)': {
        fontSize: '16px',
      },
    },
    h4: {
      fontSize: '18px',
      fontWeight: 500,
      '@media (max-width:800px)': {
        fontSize: '16px',
      },
    },
    h5: {
      fontSize: '16px',
      fontWeight: 500,
      '@media (max-width:800px)': {
        fontSize: '14px',
      },
    },
    h6: {
      fontSize: '16px',
      fontWeight: 500,
      '@media (max-width:800px)': {
        fontSize: '14px',
      },
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '1.7em',
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '1.7em',
      '@media (max-width:800px)': {
        fontSize: '12px',
      },
    },
    subtitle1: {
      fontSize: 14,
      // letterSpacing: 1,
      fontWeight: 400,
      color: '#96ADC6',
    },
    subtitle2: {
      fontSize: 13,
      // letterSpacing: 1,
      fontWeight: 400,
      color: '#96ADC6',
    },
  },
})

const overrides = createTheme(
  {
    props: {
      MuiButton: {
        disableElevation: true,
      },
    },
    overrides: {
      MuiBadge: {
        colorPrimary: {
          backgroundColor: `${queryColor || 'rgb(46, 203, 128)'} !important`,
          color: '#fff !important',
        },
        badge: {
          backgroundColor: '#dc004e !important',
          color: '#fff !important',
        },
      },
      MuiButton: {
        textPrimary: {
          background: alpha(baseTheme.palette.primary.main, 0.1),
        },
        textSecondary: {
          background: alpha(baseTheme.palette.primary.main, 0.1),
        },
        text: {
          color: '#333',
          background: 'rgba(140, 164, 186, 0.1)',
        },
      },
      MuiTable: {
        root: {
          width: '100%',
          borderCollapse: 'collapse',
        },
      },
      MuiPaper: {
        outlined: {
          border: '1px solid #E0E9F2',
        },
      },
      MuiTableRow: {
        // NOTE: these commented out lines implement alternating row colors, but they currently affect existing logic
        // root: {
        //   '&:nth-of-type(2n + 1)': {
        //     background: '#F3F7FB',
        //   },
        // },
        // head: {
        //   background: 'none',
        // },
        // footer: {
        //   background: 'none',
        // },
        hover: {
          transition: 'background-color 0.1s ease',
          '&:hover': {
            backgroundColor: '#F3F7FB !important',
          },
        },
      },
      MuiTableCell: {
        head: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontWeight: 500,
          textTransform: 'uppercase',
          fontSize: 13,
        },
        footer: {
          color: '#333',
          fontSize: 13,
        },
        root: {
          fontSize: 13,
          borderBottom: '1px solid #E0E9F2',
          padding: '18px 0px 18px 18px',
          '&:last-child': {
            paddingRight: 24,
          },
          '&:first-child': {
            paddingLeft: 24,
          },
          // prevent buttons, especially IconButtons, from increasing row height unnecessarily
          '& .MuiIconButton-root': {
            marginTop: -18,
            marginBottom: -18,
          },
        },
      },
      MuiTabs: {
        indicator: {
          height: 4,
        },
      },
      MuiCheckbox: {
        root: {
          '&$disabled': {
            opacity: 0.5,
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          minHeight: 38,
          boxSizing: 'border-box',
          '& fieldset': {
            // MUI fieldsets use non-integer dimensions to achieve the correct alignment
            // however, this becomes a problem when trying to match other elements to their height, because pixels my end up differently on screen
            // using this top offset (instead of the default -5px offset) will "undo" the effects of this pixel rounding, and allow us to match to 38px
            top: -4.5,
            minHeight: 38,
          },
        },
      },
    },
  },
  baseTheme,
)

export default overrides
