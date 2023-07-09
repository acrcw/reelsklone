import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#6c757d',
        },
        success: {
            main: '#28a745',
        },
        error: {
            main: '#dc3545',
        },
        warning: {
            main: '#ffc107',
        },
        info: {
            main: '#17a2b8',
        },
        // Add common property
        common: {
            black: '#000000',
            white: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        // Add more heading styles as needed
    },
    shape: {
        borderRadius: 4,
    },
    spacing: 8,
    background: {
        default: '#f5f5f5',
        paper: '#ffffff',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    },
    shadows: [
        'none',
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        // Add more shadow values as needed
    ],
    components: {
        // Define custom component styles here
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    }
    // Add more properties as needed
});

export default theme;
