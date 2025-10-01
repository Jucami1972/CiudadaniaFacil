import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976D2',        // Azul principal
    secondary: '#2196F3',      // Azul secundario
    background: '#ffffff',     // Fondo blanco
    surface: '#ffffff',        // Superficie de tarjetas
    error: '#B00020',         // Color de error
  },
};
