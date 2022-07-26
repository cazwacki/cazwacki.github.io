import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#730000',
            light: '#9D182D',
            dark: '#4b0a0c',
            contrastText: '#ffdc73',
        },
        secondary: {
            main: '#ffdc73',
            dark: '#ffcf40'
        },
        text: {
            primary: '#ffdc73',
            secondary: '#ffcf40',
            subtitle: '#bf9b30',
            disabled: '#a67c00'
        },
        info: {
            main: '#ffdc73',
            light: '#ffcf40',
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5b0a91',
            light: '#c67bf6',
            dark: '#490874',
        },
        secondary: {
            main: '#ffdc73',
            dark: '#ffcf40'
        },
        text: {
            primary: '#101010',
            secondary: '#555555',
            subtitle: '#999999',
            disabled: '#777777'
        },
        info: {
            main: '#5b0a91',
            light: '#c67bf6',
        },
    },
});

export { lightTheme, darkTheme }