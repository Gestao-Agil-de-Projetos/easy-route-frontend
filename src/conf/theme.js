import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: {
      main: "#2563EB",
      light: "#3B82F6",
      dark: "#1E40AF",
      contrastText: "#FFFFFF",
      gradient: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
    },
    secondary: {
      main: "#0F172A",
      light: "#475569",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      main: "#059669",
      light: "#10B981",
      dark: "#047857",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
      link: "#2563EB",
    },
    neutral: {
      100: "#F8FAFC",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },
    success: {
      main: "#10B981",
      light: "#6EE7B7",
      dark: "#047857",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#B45309",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EF4444",
      light: "#FCA5A5",
      dark: "#B91C1C",
      contrastText: "#FFFFFF",
    },
    divider: "#E2E8F0",
    action: {
      hover: "rgba(37, 99, 235, 0.08)",
      selected: "rgba(37, 99, 235, 0.12)",
      disabled: "rgba(15, 23, 42, 0.3)",
      disabledBackground: "rgba(15, 23, 42, 0.1)",
      focus: "rgba(37, 99, 235, 0.12)",
    },
  },

  shape: {
    borderRadius: 12,
  },

  sizes: {
    button: {
      large: {
        width: "448px",
        height: "68px",
      },
      medium: {
        width: "400px",
        height: "68px",
      },
    },
    form: {
      maxWidth: 420,
      inputWidth: "100%",
    },
    layout: {
      leftPanel: {
        md: "50%",
        xs: "100%",
      },
      rightPanel: {
        md: "50%",
        xs: "100%",
      },
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: "#0F172A",
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      color: "#475569",
    },
    body2: {
      fontSize: "0.9rem",
      color: "#64748B",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.12)",
    "0px 1px 5px rgba(0,0,0,0.1)",
    "0px 2px 8px rgba(0,0,0,0.08)",
    "0px 3px 10px rgba(0,0,0,0.06)",
    "0px 5px 20px rgba(0,0,0,0.05)",
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          height: "100%",
          width: "100%",
          WebkitFontSmoothing: "antialiased",
        },
        body: {
          height: "100%",
          width: "100%",
          backgroundColor: "#F9FAFB",
        },
        "#root": {
          height: "100%",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(37, 99, 235, 0.3)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
          "&:hover": {
            background: "linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#F8FAFC",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2563EB",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2563EB",
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: "#CBD5E1",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#475569",
          fontWeight: 500,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px !important",
          textTransform: "none",
          fontWeight: 600,
          borderColor: "#CBD5E1",
          color: "#0F172A",
          "&.Mui-selected": {
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#1E40AF",
            },
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h5: {
          color: "#0F172A",
          fontWeight: 700,
        },
        body2: {
          color: "#475569",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

// Design Tokens exportáveis para usar em componentes
export const colors = {
  primary: theme.palette.primary,
  secondary: theme.palette.secondary,
  tertiary: theme.palette.tertiary,
  success: theme.palette.success,
  warning: theme.palette.warning,
  error: theme.palette.error,
  info: theme.palette.info,
  neutral: theme.palette.neutral,
  background: theme.palette.background,
  text: theme.palette.text,
  divider: theme.palette.divider,
};

export const borderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  full: 9999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const typography = {
  fontFamily: theme.typography.fontFamily,
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const shadows = theme.shadows;

export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    normal: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    linear: 'linear',
  },
};
