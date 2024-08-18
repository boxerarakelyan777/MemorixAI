import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196F3',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1976D2',
            color: 'white',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(33, 150, 243, 0.12)',
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '&.MuiButton-delete': {
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: 'inherit',
        },
        secondary: {
          color: 'rgba(33, 150, 243, 0.7)',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#2196F3',
          '&.Mui-selected': {
            backgroundColor: '#2196F3',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1976D2',
            },
          },
          '&:hover': {
            backgroundColor: '#E3F2FD',
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#90CAF9",
      light: "#E3F2FD",
      dark: "#42A5F5",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    background: {
      default: "#111827", // Tailwind dark:bg-gray-900
      paper: "#1F2937", // Tailwind dark:bg-gray-800
    },
    text: {
      primary: "#F9FAFB", // Tailwind dark:text-gray-50
      secondary: "#D1D5DB", // Tailwind dark:text-gray-300
    },
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196F3',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1976D2',
            color: 'white',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(33, 150, 243, 0.12)',
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '&.MuiButton-delete': {
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: 'inherit',
        },
        secondary: {
          color: 'rgba(33, 150, 243, 0.7)',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#2196F3',
          '&.Mui-selected': {
            backgroundColor: '#2196F3',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1976D2',
            },
          },
          '&:hover': {
            backgroundColor: '#E3F2FD',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F2937', // Tailwind dark:bg-gray-800
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1F2937', // Tailwind dark:bg-gray-800
        },
      },
    },
  },
});

export { lightTheme, darkTheme };