/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const sharedConfig = require('tailwind-config-custom');

module.exports = {
  presets: [sharedConfig],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: '#1e88e5',
        secondary: '#f50057',
        success: '#43a047',
        info: '#2196f3',
        warning: '#ff9800',
        danger: '#f44336',
        light: '#f8f9fa',
        dark: '#212529',
      },
    },
  },
};
