import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%',
        margin: '0',
        padding: '0',
        background: '#0f0e17',
        boxSizing: 'border-box',
      },
    },
  },
  colors: {
    background: '#0f0e17',
    primary: '#ff8906',
    secondary: '#f25f4c',
    tertiary: '#e53170',
    headline: '#fffffe',
    paragraph: '#a7a9be',
    buttonText: '#fffffe',
  },
});

export default theme;
